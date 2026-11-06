Pod::Spec.new do |s|
  s.name = 'Nightshot'
  s.version = '1.0.0'
  s.summary = 'Local Nightshot video export'
  s.description = 'Applies green Nightshot grading before saving recorded video.'
  s.license = { :type => 'MIT' }
  s.author = 'Camera App'
  s.homepage = 'https://docs.expo.dev/modules/'
  s.platforms = { :ios => '16.4' }
  s.source = { :git => '' }
  s.static_framework = true
  s.dependency 'ExpoModulesCore'
  s.frameworks = 'AVFoundation', 'CoreImage'
  s.source_files = '**/*.swift'
  s.swift_version = '5.9'
end
