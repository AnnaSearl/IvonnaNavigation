//
//  IvonnaViewController.h
//  Ivonna
//
//  Created by 陈嘉文 on 2021/1/28.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>

NS_ASSUME_NONNULL_BEGIN

@interface IvonnaViewController : UIViewController

@property(nonatomic,readwrite,copy) NSString *pageName;
@property(nonatomic,readwrite,strong) NSDictionary *pageProperties;
@property(nonatomic,readwrite,strong) RCTBridge *bridge;

- (instancetype)initWithPageName:(NSString *)pageName properties:(NSDictionary * _Nullable)properties;

- (instancetype)initWithBridge:(RCTBridge *)bridge pageName:(NSString *)pageName properties:(NSDictionary * _Nullable)properties;

- (void)reload;

- (void)reloadWithJSBundle;

@end

NS_ASSUME_NONNULL_END




