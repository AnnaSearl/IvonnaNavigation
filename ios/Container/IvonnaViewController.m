//
//  IvonnaViewController.m
//  Ivonna
//
//  Created by 陈嘉文 on 2021/1/28.
//

#import "IvonnaViewController.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import "NSObject+ArwenUtils.h"

@interface IvonnaViewController()

@property(nonatomic,readwrite,strong) NSDictionary *props;
@property(nonatomic,readwrite,strong) RCTRootView *reactRootView;

@end

@implementation IvonnaViewController

static NSURL *JSBundleURL;

- (instancetype)initWithBridge:(RCTBridge *)bridge pageName:(NSString *)pageName properties:(NSDictionary * _Nullable)properties {
  self = [super init];
  if (self) {
      self.pageName = pageName;
      if (properties) {
        self.pageProperties = properties;
      }
      self.bridge = bridge;
      _reactRootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:pageName initialProperties:properties];
      //      [[UIApplication sharedApplication].keyWindow.rootViewController.view insertSubview:_reactRootView atIndex:0];
  }
  return self;
}

- (instancetype)initWithPageName:(NSString *)pageName properties:(NSDictionary * _Nullable)properties {
    self = [super init];
    if (self) {
        self.pageName = pageName;
        if (properties) {
          self.pageProperties = properties;
        }
        [self loadWithPageName:pageName properties:properties];
    }
    return self;
}

- (void)loadWithPageName:(NSString *)pageName properties:(NSDictionary *)properties {
    NSURL *url = [self createJSBundelURL];
    RCTRootView *rootView = [self createRCTRootViewWithURL:url pageName:pageName properties:properties];
    self.view = rootView;
}

- (void)loadView {
    self.view = _reactRootView;
}

- (void)viewDidLoad {
    [super viewDidLoad];
}

- (NSURL *)createJSBundelURL {
    NSURL *jsCodeLocation;
    #if DEBUG
        jsCodeLocation = [NSURL URLWithString:@"http://192.168.5.65:8081/index.bundle?platform=ios"];
    #else
        jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index" withExtension:@"jsbundle"];
    #endif
    JSBundleURL = jsCodeLocation;
    return jsCodeLocation;
}

- (RCTRootView *)createRCTRootViewWithURL:(NSURL *)jsUrl pageName:(NSString *)pageName properties:(NSDictionary *)properties {
    NSDictionary * dic = @{@"pageName": pageName};
    NSMutableDictionary *props = [NSMutableDictionary dictionaryWithDictionary:dic]; // [dic mutableCopy]
    if (![properties isVoid]) {
        for (NSString *key in properties) {
            [props setObject:properties[key] forKey:key];
        }
    }
    self.props = props;
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsUrl moduleName: @"RNApp" initialProperties:props launchOptions: nil];
    return rootView;
}

- (void)reload {
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:_bridge moduleName:_pageName initialProperties:_pageProperties];
    self.view = rootView;
}

- (void)reloadWithJSBundle  {
    RCTRootView *rootView = [self createRCTRootViewWithURL:JSBundleURL pageName:_pageName properties:_pageProperties];
    self.view = rootView;
}

@end


