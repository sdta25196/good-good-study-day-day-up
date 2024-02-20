from __future__ import print_function
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import datasets, transforms
from torch.optim.lr_scheduler import StepLR

BATCH_SIZE=64
TEST_BACTH_SIZE=1000
EPOCHS=5
LR=0.01
GAMMA=0.9
WEIGHT_DECAY=1e-6
SEED=42
LOG_INTERVAL=100

#定义一个全连接网络
class FeedForwardNet(nn.Module):
    def __init__(self):
        super().__init__()
        #第一层784维输入、256维输出 -- 图像大小28×28=784
        self.fc1 = nn.Linear(784, 256)
        #第二层256维输入、128维输出
        self.fc2 = nn.Linear(256, 128)
        #第三层128维输入、64维输出
        self.fc3 = nn.Linear(128, 64)
        #第四层64维输入、10维输出 -- 输出类别10类（0,1,...9）
        self.fc4 = nn.Linear(64, 10)

        # Dropout module with 0.2 drop probability
        self.dropout = nn.Dropout(p=0.2)

    def forward(self, x):
        # 把输入展平成1D向量
        x = x.view(x.shape[0], -1)

        # 每层激活函数是ReLU，额外加dropout
        x = self.dropout(F.relu(self.fc1(x)))
        x = self.dropout(F.relu(self.fc2(x)))
        x = self.dropout(F.relu(self.fc3(x)))

        # 输出为10维概率分布
        x = F.log_softmax(self.fc4(x), dim=1)

        return x

#训练过程
def train(model, loss_fn, device, train_loader, optimizer, epoch):
    #开启梯度计算
    model.train()
    for batch_idx, (data_input, true_label) in enumerate(train_loader):
        #从数据加载器读取一个batch
        #把数据上载到GPU（如有）
        data_input, true_label = data_input.to(device), true_label.to(device)
        #求解器初始化（每个batch初始化一次）
        optimizer.zero_grad()
        #正向传播：模型由输入预测输出
        output = model(data_input)
        #计算loss
        loss = loss_fn(output, true_label)
        #反向传播：计算当前batch的loss的梯度
        loss.backward()
        #由求解器根据梯度更新模型参数
        optimizer.step()
        
        #间隔性的输出当前batch的训练loss
        if batch_idx % LOG_INTERVAL == 0:
            print('Train Epoch: {} [{}/{} ({:.0f}%)]\tLoss: {:.6f}'.format(
                epoch, batch_idx * len(data_input), len(train_loader.dataset),
                100. * batch_idx / len(train_loader), loss.item()))


#计算在测试集的准确率和loss
def test(model, loss_fn, device, test_loader):
    model.eval()
    test_loss = 0
    correct = 0
    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            test_loss += loss_fn(output, target,reduction='sum').item()  # sum up batch loss
            pred = output.argmax(dim=1, keepdim=True)  # get the index of the max log-probability
            correct += pred.eq(target.view_as(pred)).sum().item()

    test_loss /= len(test_loader.dataset)

    print('\nTest set: Average loss: {:.4f}, Accuracy: {}/{} ({:.0f}%)\n'.format(
        test_loss, correct, len(test_loader.dataset),
        100. * correct / len(test_loader.dataset)))


def main():
    # 检查是否有GPU
    use_cuda = torch.cuda.is_available()

    # 设置随机种子（以保证结果可复现）
    torch.manual_seed(SEED)

    # 训练设备（GPU或CPU）
    device = torch.device("cuda" if use_cuda else "cpu")

    #设置batch size
    train_kwargs = {'batch_size': BATCH_SIZE}
    test_kwargs = {'batch_size': TEST_BACTH_SIZE}
    
    if use_cuda:
        cuda_kwargs = {'num_workers': 1,
                       'pin_memory': True,
                       'shuffle': True}
        train_kwargs.update(cuda_kwargs)
        test_kwargs.update(cuda_kwargs)

    # 数据预处理（转tensor、数值归一化）
    transform=transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
        ])

    # 自动下载MNIST数据集
    dataset_train = datasets.MNIST('data', train=True, download=True,
                       transform=transform)
    dataset_test = datasets.MNIST('data', train=False,
                       transform=transform)
    
    # 定义数据加载器（自动对数据加载、多线程、随机化、划分batch、等等）
    train_loader = torch.utils.data.DataLoader(dataset_train,**train_kwargs)
    test_loader = torch.utils.data.DataLoader(dataset_test, **test_kwargs)

    # 创建神经网络模型
    model = FeedForwardNet().to(device)
    
    # 指定求解器
    optimizer = optim.SGD(
        model.parameters(), 
        lr=LR, 
        #weight_decay=WEIGHT_DECAY
    )
    #scheduler = StepLR(optimizer, step_size=1, gamma=GAMMA)
    
    # 定义loss函数
    loss_fn = F.nll_loss
    
    # 训练N个epoch
    for epoch in range(1, EPOCHS + 1):
        train(model, loss_fn, device, train_loader, optimizer, epoch)
        test(model,loss_fn, device, test_loader)
        #scheduler.step()

if __name__ == '__main__':
    main()