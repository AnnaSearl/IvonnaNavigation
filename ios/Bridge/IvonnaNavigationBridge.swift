//
//  IvonnaNavigationBridge.swift
//  Ivonna
//
//  Created by 陈嘉文 on 2021/6/23.
//

import UIKit


@objc(IvonnaNavigationBridge)
public class IvonnaNavigationBridge: NSObject {

    @objc(push:params:animated:callback:)
    public func push(_ name: String, params: [String : Any]?, animated: Bool, callback: RCTResponseSenderBlock?) -> Void {
        DispatchQueue.main.async {
            let rnManager = IvonnaContainerManager.shared();
            var props:[String : Any]? = nil;
            if (params != nil || callback != nil) {
                var vParams:[String : Any] = [:];
                if (params != nil) {
                    vParams = params!;
                }
                if (callback != nil) {
                    vParams["paramsCallback"] = callback!;
                }
                props = [:]; // 这一行要加，否则一直是nil
                props?["params"] = vParams;
            }
            let rnVC = rnManager.container(name, properties: props);
            IvonnaApp.navigationController().pushViewController(rnVC, animated: animated);
        }
    }

    @objc(pop:)
    public func pop(_ animated: Bool) -> Void {
        DispatchQueue.main.async {
            IvonnaApp.navigationController().popViewController(animated: animated);
        }
    }

    @objc public func switchTab(_ index: Int) -> Void {
        DispatchQueue.main.async {
            IvonnaApp.tabBarController().tabBar.isHidden = false;
            IvonnaApp.navigationController().popToRootViewController(animated: false);
            IvonnaApp.tabBarController().selectedIndex = index;
        }
    }

}

