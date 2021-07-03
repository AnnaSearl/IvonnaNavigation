//
//  IvonnaContainerManager.h
//  Ivonna
//
//  Created by 陈嘉文 on 2021/2/27.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>
#import "IvonnaViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface IvonnaContainerManager : NSObject

@property(nonatomic,readwrite,strong) RCTBridge *bridge;

+ (instancetype)sharedManager;

- (IvonnaViewController *)container:(NSString *)pageName properties:(NSDictionary * _Nullable)properties;

@end

NS_ASSUME_NONNULL_END
