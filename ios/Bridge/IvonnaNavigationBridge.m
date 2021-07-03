//
//  IvonnaNavigationBridge.m
//  Ivonna
//
//  Created by 陈嘉文 on 2021/6/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(IvonnaNavigationBridge, NSObject)

RCT_EXTERN_METHOD(push:(NSString *)name params:(NSDictionary * _Nullable)params animated:(BOOL)animated callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(pop:(BOOL)animated)

RCT_EXTERN_METHOD(switchTab:(NSInteger)index)

@end

