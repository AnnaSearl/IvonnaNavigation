//
//  IvonnaContainerManager.m
//  Ivonna
//
//  Created by 陈嘉文 on 2021/2/27.
//  https://stackoverflow.com/questions/46903212/is-it-possible-to-add-the-same-view-to-two-different-view-controllers
//

#import "IvonnaContainerManager.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTEventEmitter.h>

@interface IvonnaContainerManager ()<RCTBridgeDelegate>

@end

@implementation IvonnaContainerManager

static IvonnaContainerManager *__manager;

+ (instancetype)sharedManager {
    static dispatch_once_t oneToken;
    dispatch_once(&oneToken, ^{
        __manager = [[IvonnaContainerManager alloc] init];
    });
    return __manager;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        self.bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
    }
    return self;
}

- (IvonnaViewController *)container:(NSString *)pageName properties:(NSDictionary * _Nullable)properties {
    IvonnaViewController *container = [[IvonnaViewController alloc] initWithBridge:self.bridge pageName:pageName properties:properties];
    return container;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    #if DEBUG
        // return[NSURL URLWithString:@"http://192.168.6.3:8081/index.bundle?platform=ios"];
        return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    #else
        return [[NSBundle mainBundle] URLForResource:@"bundle/index" withExtension:@"jsbundle"];
    #endif
}

@end
