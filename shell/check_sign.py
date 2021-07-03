#!/usr/bin/python3
# 检查打包的apk的签名文件是否正确

import re
import os
import sys
import subprocess

def compare(info, regex_str, compare_str):
    p = re.compile(regex_str)
    search = p.search(info)

    if not search:
        exit('提取签名信息失败')
    extra_str = search.group(1)
    if extra_str != compare_str:
        exit('校验失败\ncurrent: {}\nright: {}'.format(extra_str, compare_str))

RIGHT_SHA1 = '5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25'
RIGHT_SHA256 = 'FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C'

def main():
    if len(sys.argv) == 1:
        exit('usage: ' + sys.argv[0] + " apk_path")
    apk_path = os.path.abspath(sys.argv[1])

    if not os.path.exists(apk_path):
        exit('{} not exist'.format(apk_path))

    sign_info = subprocess.run(['keytool', '-printcert', '-jarfile', apk_path], stdout=subprocess.PIPE).stdout.decode('utf-8')
    compare(sign_info, 'SHA1: (.*)', RIGHT_SHA1)
    compare(sign_info, 'SHA256: (.*)', RIGHT_SHA256)
    print('校验通过')


if __name__ == '__main__':
    main()