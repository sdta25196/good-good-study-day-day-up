# C++开发环境配置实验 V2.4

## 实验目的：

> 因整课学习需要，并便利学生满足同样环境下的开发需要，特此设定本实验。推荐使用云主机的好处有以下内容：
>
> - 环境统一，不必费心于解决由于不同环境引起的各种问题
> - 云主机拥有公网IP，在后续的课程中部分任务需要使用到公网IP
> - 更换系统、重置操作相较于本地更容易配置，步骤简单
>
> 推荐配置环境：
>
> 1. Mac + 阿里云主机
> 2. Linux + 阿里云主机
> 3. Windows + Xshell +阿里云主机
> 4. Windows + 虚拟机 + 阿里云主机

## 实验前期准备：

> 硬件环境：物理机一台（Windows，Mac，Linux系统均可）
>
> 软件环境：浏览器，终端软件（Mac和Linux下Terminal，Windows下Xshell）
>
> 非编程准备：少量资金

## 实验步骤：

### 云服务器免费领取&配置

> **云主机首选阿里云高校计划，如高校计划无法领取免费的云主机，请选择阿里云云翼计划，购买一个月的学生机。**
>
> 如果你已经不是学生了，请综合考虑各大云平台对新用户是否有优惠政策（阿里云，腾讯云，华为云，金山云，京东云等等），这里推荐腾讯云。

#### 腾讯云

开发者专属扶持活动 （1核4G 2M带宽云服务器，3年仅需376元，购买时长依据自身学习时长确定，最少不低于半年哦）
 详情见：https://cloud.tencent.com/act/developer?from=12642#task_learn
 镜像选择：ubuntu18.04 及`以上`

#### 华为云

华为云云创校园，[学生优惠套餐]( https://developer.huaweicloud.com/campus?productType=KC1_1&timeType=1&regionType=1&domainItemData=)

通用计算增强型云服务器，搭载自研华为鲲鹏920处理器及25GE智能高速网卡，提供强劲鲲鹏算力和高性能网络，购买指定配置服务可享受9元/月优惠，并赠送相同时长主机安全。

#### 阿里云高校计划

本课程的项目阶段，会用到网络编程，为了方便评测及多机互联，需要一个具有公网IP地址的Linux主机，推荐大家领取阿里云的学生云主机。

`请大家优先领取免费的云主机`，**性能更高**，**时间更长**，**免费、免费、免费**

`↓ ↓ ↓ ↓`

领取链接：[阿里云高校计划](https://developer.aliyun.com/adc/student/)

![](http://47.93.11.51:88/img/2020-07-03/78A24D162CE046A88A0CA8B575C57651.jpg)

#### 备份方案：阿里云云翼计划

购买链接：[阿里云学生机 - 云翼计划](https://promotion.aliyun.com/ntms/act/campus2018.html)

> 完成实名认证，且在24周岁下的用户均可购买阿里云学生机，已经购买过的同学无需再次购买。
>
> 使用时长大概为6-8个月，具体购买形式自定。

<img src="http://47.93.11.51:88/img/2020-07-03/56E36AB10B69462E9D71390653D23E60.png" style="zoom:33%;" />

#### 阿里云：开发者优惠

https://developer.aliyun.com/plan/grow-up?spm=a2c6h.13788135.1364563.37.fe705f24KswL66



#### 云主机配置

选择配置的过程中，请注意选择操作系统为 **Ubuntu 18.04 64位**及以上版本。服务器地域及其他项不做限制，按默认即可。付款成功后，在进一步按提示配置服务器时，请牢记你所设置的root用户密码。

![](http://haizeix.tech:88/img/2021-03-14/5640EB11712E495BAB0A26F41F004B8F.jpg)

当配置完成后，你可以在导航栏中 控制台 > 云服务器ECS 的 概览下，看到你所购买的云主机及其IP地址：

![](http://47.93.11.51:88/img/2020-07-03/100893B1129044B3A52702EC14F2FC20.png)

点击蓝色实例ID可以查看更详细的信息及相关设置，在这里你可以记录下你的公网IP，以便后续远程连接云主机时使用。



> 如果你到这一步，并没有设置root用户的密码，那么请你百度如下字段：阿里云服务器如何重置root密码。

**请注意看这里**

***请注意看这里***

==请注意看这里==

> 如果你用的是腾讯云等其他云平台，可能系统安装后的某人用户不是`root`,那么，请你在下面的`Xshell安装及连接云服务器`的章节中，把用户名`root`更改为你的服务商设置的用户名。
>
> 如：腾讯云为`ubuntu`
>
> 然后，连接到你的云主机之后，请使用`sudo passwd root`命令给`root`用户一个密码，之后重新做下面的`使用Xshell连接云服务器`的操作，使用用户名root和刚才你设置的密码。 （如果你会Linux，那么可以直接在后面的操作中，使用sudo来获取管理员权限）
>
> 之后，你就可以完全按照该文档操作了。

### Xshell安装及连接云服务器

> **注意**：如果你的电脑是Linux或Mac系统，则无需下载安装Xshell，及Xftp；
>
> 使用Linux或者Mac连接阿里云主机的方式为：ssh username@your_ip

1. 访问[XShell个人免费版下载页面](https://www.netsarang.com/zh/free-for-home-school/)，按提示填写姓名以及邮件地址，勾选“两者”。

![](http://47.93.11.51:88/img/2020-07-02/168DDE9B2AF749ED89F4DEBEDAF5B533.jpg)



2. 登录你所填写的邮箱，你将会收到一封带有下载地址的邮件，点击即可下载Xshell和xftp。

![](http://47.93.11.51:88/img/2020-07-03/36109644B63947379EBA7AF9E803710A.png)

>如果你并未找到这封邮件，可以检查一下邮箱的垃圾箱，或重新填写上述网址的表单。
>
>如果下载速度较为缓慢，可以尝试科学上网进行下载。
>
>同样有条件的同学也可以使用网盘下载，链接:https://pan.baidu.com/s/1FcY0r3t-EcwJNIa4ca5oxQ 提取码:dmza （永久有效，但不能保证一定可以）



3. 安装过程不涉及特殊设置，一路下一步直到安装完成即可（或可按个人需求更改安装路径）。

     

4. 安装完成后，打开xshell，点击左上角的新建会话图标，选择SSH协议，将阿里云控制台中你服务器的**公网IP**填入主机一栏。（名称一栏为方便标示不同的主机用，可根据需求自行填写）

![](http://47.93.11.51:88/img/2020-07-03/2475BB798C644C8E993B9A9800BBB080.png)



5. 点击左侧用户身份验证一项，填入服务器的用户名与密码（阿里云默认用户名为root），然后点击下方的连接按钮。

![](http://47.93.11.51:88/img/2020-07-03/4C527FC7300F4CD59B923B9D36880E4F.png)



6. 首次连接会弹出SSH安全警告，选择接受并保存即可。

   ![](http://47.93.11.51:88/img/2020-07-03/13BA59710DD64255BCDABE8F0E8C0F04.png)

   

7. 当看到Welcome字样的提示信息时，代表已经成功连接了云服务器。如果没有看到欢迎信息而是看到了拒绝连接等的提示信息，请检查你的用户名或密码是否输入正确。

![](http://47.93.11.51:88/img/2020-07-03/2844D44A6E034E6E8C4456245C0C4C05.png)

> xftp无需配置，可用来在你的本地主机和远程主机之间传输文件；
>
> 感兴趣的同学也可以了解两个Linux命令：rz、sz。





==如果你不愿意用xshell，在win10下下载一个git bash，然后使用ssh命令连接云主机也可以==



### 安装系统后的环境准备

#### 添加普通用户（如已添加普通用户，跳转到下一步配置sshd）

> 在Linux使用过程中，应尽量避免使用root用户直接使用系统，请使用下面的步骤创建一个新用户

1. 添加新用户

   ```bash
   adduser new_user
   #以下是注释，仔细阅读，不需要执行
   #根据自己的真实需求修改new_user
   #这里是创建一个新的用户，用户名不要用new_user
   #如果你执行这条命令没有任何反应，说明你购买云主机选的是轻量级服务器，但是操作系统选的不是Ubuntu
   #如果你是腾讯云，执行这条命令提示无权限，请直接在命令前面添加sudo，和一个空格再执行，下面的命令也是一样。
   ```

2. 将用户添加到`sudo`组中

   ```bash
   usermod -G sudo new_user
   ```


3. 使用`su`命令切换到新用户

   ```bash
   su - new_user
   ```

> 添加新用户之后，请在`xshell`中重新添加一个新用户的连接，以后直接使用新用户登录系统

`↓↓↓`

==请注意，从这里开始，所有的操作都是用普通用户做的==

`↑↑↑`



#### 配置sshd

> ==Vim的使用，请百度一下==

1. 使用命令`sudo vim /etc/ssh/sshd_config`打开sshd的配置文件，找到`ClientAliveInterval`和`ClientAliveCountMax`并将其修改为（如果没有直接添加即可）：

   ![](http://47.93.11.51:88/img/2020-07-02/AE83BB192D2149C188EC1A10C645087B.jpg)

2. 重启sshd服务

   ```bash
   sudo service sshd restart
   ```

> 如果上述命令报错，大致内容为sshd这个服务不存在的话，就执行`sudo service ssh restart`
>
> **或者**：如果你用的是虚拟机或本地桌面系统，需要首先安装ssh服务，==请注意，我们并不推荐你使用本地机器，但本地机器也可以按照本文档做一些优化配置==
>
> 请使用命令`sudo apt install openssh-server`安装服务


------------------------

**以下所有配置，都是为了优化终端，提升使用效率，如果你已经能独立对bash，zsh，vim等进行配置优化，可自行选择方案，无需完全按照这个方案**

------------------------------

#### GitHub访问优化

1. 请进入这个网址：[点击这里](https://fastly.net.ipaddress.com/github.global.ssl.fastly.net#ipinfo)

2. 找到图中的`IP1`

   ![](http://47.93.11.51:88/img/2020-08-25/9D64D51C5B114E779881DAA99082F3AA.jpg)

3. 在上面的网站上搜索`github.com`,找到`IP2`

   ![](http://47.93.11.51:88/img/2020-08-25/745B757D3C344DB59035F6C14C5BE167.jpg)

4. 使用命令`sudo vim /etc/hosts`打开hosts文件，并在最后加入以下信息

   ```bash
   199.232.69.194 github.global.ssl.fastly.net
   140.82.112.4 github.com
   ```

5. 保存并退出



####配置Vim（使用新添加的用户操作）

> 在后续的学习过程中，会使用`vim`写程序

[Vim配置推荐 - ma6174](https://github.com/ma6174/vim)（不用打开这个官方网站）

1. 更新apt源信息

   ```bash
   sudo apt update
   ```

2. 安装`git`

   ```bash
   sudo apt install git
   ```

3. 配置vim，执行下面命令配置安装vim

   ```bash
   wget 47.93.11.51:88/install_vim.sh
   bash install_vim.sh
   ```

> vim的配置因为需要安装较多插件，所以需要等较多时间，大家耐心等待



#### zsh的安装及配置

1. 安装zsh

```bash
sudo apt install zsh
```

2. 修改默认shell为zsh

```bash
chsh -s /bin/zsh
```

3. 安装oh-my-zsh

```bash
wget 47.93.11.51:88/install_zsh.sh
bash install_zsh.sh
```

4. 安装==zsh-syntax-highlighting==

```bash
git clone https://gitee.com/suyelu/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

5. 使用命令`vim ~/.zshrc`打开.zshrc文件，找到`plugins=()`这一行，将zsh-syntax-highlighting添加进去

```bash
plugins=(git zsh-syntax-highlighting)
```

6. 安装其他插件

```bash
##命令自动补全插件
mkdir ~/.oh-my-zsh/plugins/incr
wget http://mimosa-pudica.net/src/incr-0.2.zsh -O ~/.oh-my-zsh/plugins/incr/incr.plugin.zsh
##目录自动跳转插件
sudo apt install autojump
```

7. 使用命令`vim ~/.zshrc`，打开后在最后插入以下内容：

```bash
#设置终端颜色，提示符，及上一条指令返回码提示
autoload -U colors && colors
PROMPT="%{$fg[red]%}%n%{$reset_color%}@%{$fg[blue]%}%m %{$fg[yellow]%}%1~ %{$reset_color%}%# "
RPROMPT="[%{$fg[yellow]%}%?%{$reset_color%}]"
# Useful support for interacting with Terminal.app or other terminal programs
[ -r "/etc/zshrc_$TERM_PROGRAM" ] && . "/etc/zshrc_$TERM_PROGRAM"
source /usr/share/autojump/autojump.sh
source ~/.oh-my-zsh/plugins/incr/incr*.zsh
```

> 注意，复制后可能会因为Vim的配置导致以上内容被注释，也就是在前面加上了`#`,如果有的话，删掉就行。

#### ctags安装与配置

1. 使用以下命令安装**ctags**

```bash
sudo apt install ctags     
```

2. 执行以下命令

```bash
ctags -I __THROW -I __attribute_pure__ -I __nonnull -I __attribute__ --file-scope=yes --langmap=c:+.h --languages=c,c++ --links=yes --c-kinds=+p --c++-kinds=+p --fields=+iaS --extra=+q  -f ~/.vim/systags /usr/include/* /usr/include/x86_64-linux-gnu/sys/* /usr/include/x86_64-linux-gnu/bits/*  /usr/include/arpa/*
```

3. 使用命令`vim ~/.vimrc`编辑.vimrc，在最后添加以下内容

```bash
set tags+=~/.vim/systags
```

#### 安装glibc-doc

1. 使用以下命令安装

```bash
sudo apt install glibc-doc
```

## 结果及验证：

### 1、个人验证

#### zsh验证

1. 断开当前连接
2. 重新登录远程云主机
3. 如果显示如下图这样，那就基本没问题

![img](http://haizeix.tech:88/img/2020-09-24/689292730F53402EB4EB97EC88B6B84E.jpg)

1. 在终端输入命令`pwd`,再加一个空格，如果显示如下图，就没问题

![img](http://haizeix.tech:88/img/2020-09-24/1DF6D1B8F1F24A62843270A813ED3FCD.png)

#### vim验证

1. 使用命令`vim a.c`,如果直接打开，并显示如下图，则没问题

![img](http://haizeix.tech:88/img/2020-09-24/1E9FF117FA3448C9B9773FED7DCBE50A.jpg)

#### ctags验证

1. 写一个`HelloWorld`的程序，在`vim`普通模式下，移动光标到`printf`
2. 键入`ctrl + ]`,显示如下图

![img](http://haizeix.tech:88/img/2020-09-24/4A95403CE1D84093B7C2F900B0BAE81B.jpg)

1. 键入`1`,进入`stdio.h`

![img](http://haizeix.tech:88/img/2020-09-24/1EA3E9DA097549F6B99EAE62A7C3E258.jpg)

1. 键入`ctrl + o`返回原程序
2. 如果可以完成上述操作，没有报错，就说明没问题

### 2、测评验证

#### 下载测评软件

**推荐大家在云主机上使用`Ubuntu 18.04`操作系统**，但是如果你的是`20.04`或者`21.04`的也影响不大，其他系统，暂不提供测评软件，不过你也可以将你的需求告知`班班`统计。

> 请安装与你系统版本一致的测评软件，在你的云主机上执行

```sh
wget http://123.57.102.65/data/kkb_check_ubuntu_XX.04 -O kkb_check
chmod a+x kkb_check
sudo mv kkb_check /usr/bin
exit
#重新连接云主机
```

注意：请将上面第一个命令中的`xx`改成你的Ubuntu系统版本号，或者`18`或者`20`

**如果你是华为云或其他arm架构的系统**：请将`kkb_check_ubuntu_XX.04`更换为`kkb_check_ubuntu_18.04_arm`尝试

#### 执行测评程序

```sh
kkb_check
```

#### 开始测评

> 测评服务请登录`xue.kaikeba.com`,在`我的任务`中查看。

1. 点击[测评任务](https://xue.kaikeba.com/interactive-task)上的`开始请求按钮`，开始测评
2. 获得弹出页面中的`5位数字`的测评码
3. 在`页面上`，单击开始测评
4. 在测评程序中输入测评码，稍等`5s`后回车
5. 在网站上得到最终测评成绩

