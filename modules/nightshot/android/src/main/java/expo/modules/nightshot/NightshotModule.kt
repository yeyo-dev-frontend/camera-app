package expo.modules.nightshot

import android.net.Uri
import android.os.Handler
import android.os.Looper
import androidx.media3.common.MediaItem
import androidx.media3.common.MimeTypes
import androidx.media3.common.util.UnstableApi
import androidx.media3.effect.RgbMatrix
import androidx.media3.transformer.*
import expo.modules.kotlin.Promise
import expo.modules.kotlin.functions.Queues
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.File
import java.util.UUID

@UnstableApi
class NightshotModule : Module() {
  private var transformer: Transformer? = null
  private var pending: Promise? = null
  private var output: File? = null

  override fun definition() = ModuleDefinition {
    Name("Nightshot")

    AsyncFunction("exportAsync") { uri: String, promise: Promise ->
      if (pending != null) {
        promise.reject("E_BUSY", "Ya se está procesando un vídeo.", null)
        return@AsyncFunction
      }
      val context = appContext.reactContext
      if (context == null || Uri.parse(uri).scheme != "file") {
        promise.reject("E_INPUT", "Se necesita un vídeo local.", null)
        return@AsyncFunction
      }
      pending = promise
      val destination = File(context.cacheDir, "nightshot-${UUID.randomUUID()}.mp4")
      output = destination
      try {
        // Green luminance grading, column-major RGBA matrix (linear BT.709).
        val matrix = floatArrayOf(
          0.038f, 0.255f, 0.026f, 0f,
          0.129f, 0.858f, 0.086f, 0f,
          0.013f, 0.087f, 0.009f, 0f,
          0f, 0.018f, 0f, 1f
        )
        val tint = object : RgbMatrix {
          override fun getMatrix(presentationTimeUs: Long, useHdr: Boolean) = matrix
        }
        val item = EditedMediaItem.Builder(MediaItem.fromUri(uri))
          .setEffects(Effects(emptyList(), listOf(tint)))
          .build()
        transformer = Transformer.Builder(context)
          .setVideoMimeType(MimeTypes.VIDEO_H264)
          .addListener(object : Transformer.Listener {
            override fun onCompleted(composition: Composition, result: ExportResult) {
              val completed = pending
              pending = null
              transformer = null
              output = null
              completed?.resolve(Uri.fromFile(destination).toString())
            }

            override fun onError(composition: Composition, result: ExportResult, exception: ExportException) {
              fail(exception)
            }
          }).build()
        transformer!!.start(item, destination.absolutePath)
      } catch (exception: Exception) {
        fail(exception)
      }
    }.runOnQueue(Queues.MAIN)

    OnDestroy {
      Handler(Looper.getMainLooper()).post {
        transformer?.cancel()
        fail(IllegalStateException("La exportación se interrumpió."))
      }
    }
  }

  private fun fail(exception: Exception) {
    val rejected = pending
    pending = null
    transformer = null
    output?.delete()
    output = null
    rejected?.reject("E_NIGHTSHOT", exception.message ?: "No se pudo aplicar Nightshot.", exception)
  }
}
