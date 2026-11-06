import ExpoModulesCore
import AVFoundation
import CoreImage

public class NightshotModule: Module {
  private var session: AVAssetExportSession?

  public func definition() -> ModuleDefinition {
    Name("Nightshot")

    AsyncFunction("exportAsync") { (uri: String, promise: Promise) in
      guard self.session == nil else {
        promise.reject("E_BUSY", "Ya se está procesando un vídeo.")
        return
      }
      guard let source = URL(string: uri), source.isFileURL else {
        promise.reject("E_INPUT", "Se necesita un vídeo local.")
        return
      }
      let asset = AVURLAsset(url: source)
      guard let exporter = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetHighestQuality) else {
        promise.reject("E_NIGHTSHOT", "No se pudo preparar el vídeo.")
        return
      }
      let destination = FileManager.default.temporaryDirectory
        .appendingPathComponent("nightshot-\(UUID().uuidString).mp4")
      exporter.outputURL = destination
      exporter.outputFileType = .mp4
      exporter.videoComposition = AVVideoComposition(asset: asset) { request in
        let image = request.sourceImage.applyingFilter("CIColorMatrix", parameters: [
          "inputRVector": CIVector(x: 0.038, y: 0.129, z: 0.013, w: 0),
          "inputGVector": CIVector(x: 0.255, y: 0.858, z: 0.087, w: 0),
          "inputBVector": CIVector(x: 0.026, y: 0.086, z: 0.009, w: 0),
          "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 1),
          "inputBiasVector": CIVector(x: 0, y: 0.018, z: 0, w: 0)
        ])
        request.finish(with: image, context: nil)
      }
      self.session = exporter
      exporter.exportAsynchronously {
        DispatchQueue.main.async {
          self.session = nil
          if exporter.status == .completed {
            promise.resolve(destination.absoluteString)
          } else {
            try? FileManager.default.removeItem(at: destination)
            promise.reject("E_NIGHTSHOT", exporter.error?.localizedDescription ?? "No se pudo aplicar Nightshot.")
          }
        }
      }
    }.runOnQueue(.main)

    OnDestroy {
      self.session?.cancelExport()
    }
  }
}
