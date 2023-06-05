#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface OpenCVModule : NSObject <RCTBridgeModule>

@end

@implementation OpenCVModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(stitchImages:(NSArray *)imagePaths
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSMutableArray *images = [NSMutableArray array];
    
    for (NSString *path in imagePaths) {
        UIImage *image = [UIImage imageWithContentsOfFile:path];
        
        if (image) {
            [images addObject:image];
        }
    }
    
    NSError *error = nil;
    UIImage *panoramaImage = [self stitchImages:images error:&error];
    
    if (panoramaImage) {
        NSString *panoramaPath = [self savePanoramaImage:panoramaImage];
        resolve(panoramaPath);
    } else {
        reject(@"stitching_error", @"Stitching failed", error);
    }
}

- (UIImage *)stitchImages:(NSArray *)images error:(NSError **)error
{
    // Thực hiện stitching ở đây sử dụng OpenCV
}

- (NSString *)savePanoramaImage:(UIImage *)image
{
    // Lưu ảnh panorama vào thư mục của dự án và trả về đường dẫn
}

@end
