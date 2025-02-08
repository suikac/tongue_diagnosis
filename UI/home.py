# 导入必要的PyQt5组件和系统模块
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
import sys

# 导入舌象特征预测相关的模型
import effcient_Net.tongue_crack.crack_predict as crack        # 裂纹检测模型
import effcient_Net.tongue_coated.coated_predict as coated     # 苔色检测模型
import effcient_Net.tongue_color.color_predict as color        # 舌色检测模型
import effcient_Net.tongue_indentation.indent_predict as indent # 齿痕检测模型
import os
from UI.home_page import Ui_HomePageWindow
from UI.seg_tongue_work import Ui_MainWindow

# 解决多线程冲突问题
os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"

# 主窗口类，继承QMainWindow和Ui_HomePageWindow
class mainWin(QMainWindow, Ui_HomePageWindow):
    def __init__(self,parent=None):
        super(mainWin, self).__init__(parent)
        self.setupUi(self)  # 初始化UI
        self.pushButton.clicked.connect(self.login)  # 连接登录按钮点击事件
    
    # 登录函数：关闭主窗口，显示第二个窗口
    def login(self):
        main_win.close()
        second_main.show()

# 第二个窗口类，继承QMainWindow和Ui_MainWindow
class secondmain(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super(secondmain,self).__init__(parent)
        self.setupUi(self)  # 初始化UI
        # 绑定按钮事件
        self.loadtongue.clicked.connect(self.openimage)    # 加载图片按钮
        self.loadtongue.setFlat(True)                      # 设置按钮扁平化
        self.start.clicked.connect(self.start_predict)     # 开始预测按钮
        self.back_btn.clicked.connect(self.back_home)      # 返回主页按钮

    # 打开图片函数
    def openimage(self):
        # 清空所有文本显示
        self.tongue_color.setText("")
        self.tai_color.setText("")
        self.tongue_shape2.setText("")
        self.tongue_shape3.setText("")
        self.sugtext.setText("")
        
        # 打开文件对话框选择图片
        imgName,imgType = QFileDialog.getOpenFileName(self,"打开图片", "../data/test", "*.jpg;*.tif;*.png;;All Files(*)")
        if imgName == "":
            return 0
        # 加载并显示图片
        jpg = QPixmap(imgName).scaled(self.uesr_tongue.width(),self.uesr_tongue.height())
        jpg.save('./user_load.jpg')  # 保存用户上传的图片
        self.sugtext.setText("")
        self.uesr_tongue.setPixmap(jpg)

    # 返回主页函数
    def back_home(self):
        # 重置所有显示内容
        self.uesr_tongue.setPixmap(QPixmap('img/back2.jpg'))
        self.tongue_recognition.setPixmap(QPixmap('img/back2.jpg'))
        self.tongue_color.setText("")
        self.tai_color.setText("")
        self.tongue_shape2.setText("")
        self.tongue_shape3.setText("")
        self.sugtext.setText("")
        # 关闭当前窗口，显示主窗口
        second_main.close()
        main_win.show()

    # 开始预测函数
    def start_predict(self):
        # 清空之前的预测结果
        self.tongue_color.setText("")
        self.tai_color.setText("")
        self.tongue_shape2.setText("")
        self.tongue_shape3.setText("")
        
        # 显示识别结果图
        self.tongue_recognition.setPixmap(
        QPixmap('./img/1.png').scaled(self.tongue_recognition.width(), self.tongue_recognition.height()))
        
        # 调用各个模型进行预测
        crack_class, crack_prob = crack.main('./user_load.jpg')     # 裂纹预测
        coated_class, coated_prob = coated.main('./user_load.jpg')  # 苔色预测
        color_class, color_prob = color.main('./user_load.jpg')     # 舌色预测
        indent_class, indent_prob = indent.main('./user_load.jpg')  # 齿痕预测

        # 将预测结果转换为中文描述
        # ... (后续代码包含大量if-else条件判断，用于根据不同组合给出中医诊断建议)

# 主程序入口
if __name__ == '__main__':
    app = QApplication(sys.argv)  # 创建QT应用程序实例
    
    # 初始化主窗口和第二窗口
    main_win = mainWin()
    second_main = secondmain()
    
    # 设置主窗口大小
    main_win.setFixedSize(1666,870)
    
    # 显示主窗口
    main_win.show()
    
    # 运行应用程序，进入事件循环
    sys.exit(app.exec_())