//
//  IvonnaApp.m
//  Ivonna
//
//  Created by 陈嘉文 on 2021/2/27.
//

#import "IvonnaApp.h"

@implementation IvonnaApp

static IvonnaAppDelegate *app;
static UIWindow *window;
static UINavigationController *navController;
static UITabBarController *tabBarController;

+ (NSString *)apiVersion {
    return @"v1";
}

+ (IvonnaAppDelegate *)appDelegate {
    if (!app) {
        app = (IvonnaAppDelegate *)[[UIApplication sharedApplication] delegate];
    }
    return app;
}

+ (UIWindow *)window {
    if (!window) {
        app = [self appDelegate];
        window = [app window];
    }
    return window;
}

+ (UINavigationController *)navigationController {
    app = [self appDelegate];
    if (!navController) {
        navController = (UINavigationController *)(app.window.rootViewController);
    }
    return navController;
}

+ (UITabBarController *)tabBarController {
    app = [self appDelegate];
    navController = [self navigationController];
    if (!tabBarController) {
        tabBarController = navController.viewControllers[0];
    }
    return tabBarController;
}

+ (UIViewController *)currentViewController {
    window = [self window];
    UIViewController *currentVc = [self findCurrentShowingViewControllerFrom:window.rootViewController];
    return currentVc;
}

+ (UIViewController *)findCurrentShowingViewControllerFrom:(UIViewController *)vc {
    //方法1：递归方法 Recursive method
    UIViewController *currentShowingVC;
    if ([vc presentedViewController]) { //注要优先判断vc是否有弹出其他视图，如有则当前显示的视图肯定是在那上面
        // 当前视图是被presented出来的
        UIViewController *nextRootVC = [vc presentedViewController];
        currentShowingVC = [self findCurrentShowingViewControllerFrom:nextRootVC];

    } else if ([vc isKindOfClass:[UITabBarController class]]) {
        // 根视图为UITabBarController
        UIViewController *nextRootVC = [(UITabBarController *)vc selectedViewController];
        currentShowingVC = [self findCurrentShowingViewControllerFrom:nextRootVC];

    } else if ([vc isKindOfClass:[UINavigationController class]]){
        // 根视图为UINavigationController
        UIViewController *nextRootVC = [(UINavigationController *)vc visibleViewController];
        currentShowingVC = [self findCurrentShowingViewControllerFrom:nextRootVC];

    } else {
        // 根视图为非导航类
        currentShowingVC = vc;
    }

    return currentShowingVC;
}

@end

