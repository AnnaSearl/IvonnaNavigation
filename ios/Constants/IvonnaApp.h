//
//  IvonnaApp.h
//  Ivonna
//
//  Created by 陈嘉文 on 2021/2/27.
//

#import <UIKit/UIKit.h>

@interface IvonnaAppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic,strong) UIWindow * _Nonnull window;

@end

NS_ASSUME_NONNULL_BEGIN

@interface IvonnaApp : NSObject

+ (NSString *)apiVersion;
+ (IvonnaAppDelegate *)appDelegate;
+ (UIWindow *)window;
+ (UINavigationController *)navigationController;
+ (UITabBarController *)tabBarController;
+ (UIViewController *)currentViewController;

@end

NS_ASSUME_NONNULL_END

