import os
import shutil

# 定义源目录和目标目录
src_dir = "UI/舌苔"
dst_dir = "UI/舌苔副本"

# 创建副本文件夹
def create_backup():
    # 如果目标目录已存在，先删除
    if os.path.exists(dst_dir):
        shutil.rmtree(dst_dir)
    
    # 复制整个目录
    shutil.copytree(src_dir, dst_dir)

if __name__ == "__main__":
    create_backup() 