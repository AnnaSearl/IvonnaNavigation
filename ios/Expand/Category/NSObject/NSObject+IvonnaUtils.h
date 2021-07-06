//
//  NSObject+IvonnaUtils.h
//  Ivonna
//
//  Created by 陈嘉文 on 2021/3/9.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSObject (IvonnaUtils)

+ (BOOL)isVoid:(id)obj;

- (BOOL)isVoid;

- (NSString *)toSafeStringValue;

- (id)performSelector:(SEL)aSelector withObjects:(NSArray *)objects;

@end

NS_ASSUME_NONNULL_END
