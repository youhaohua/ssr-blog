import {Form, Input, Button, Checkbox,message} from 'antd';
import {login} from "../api/user"
import Router from 'next/router'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Home = () => {
    const onFinish =async (values) => {
        const data=await login(values);
        if(data.errno==0){ 
            message.success('登录成功');
            Router.push("/")
        }else{ 
            message.error('登录失败');
        }
        console.log('Received values of form:',data,values);
      };
    return (
        <div className="homeWrap">
            <div className="loginBox">
                <p className="loginText">登录</p>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                    remember: true
                }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{
                            required: true,
                            message: '请输入您的用户名!'
                        }
                    ]}>
                        <Input
                            prefix={< UserOutlined className = "site-form-item-icon" />}
                            placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: '请输入您的密码!'
                        }
                    ]}>
                        <Input
                            prefix={< LockOutlined className = "site-form-item-icon" />}
                            type="password"
                            placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        Or
                        <a href="" style={{color:"#ffffff"}}>注册!</a>
                    </Form.Item>
                </Form>

            </div>

            <style jsx>{` .homeWrap {
                        width: 100%;
                        height: 100vh;
                        overflow: hidden;
                        background: url('../static/images/home.jpg') center center no-repeat;
                        background-size: cover;
                        position: relative;
                    }
                    .loginBox {
                        position: absolute;
                        width: 3.5rem;
                        height: 4.5rem;
                        color: #ffffff;
                        background: rgba(0,0,0,0.5);
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        border-radius: 0.1rem;
                        padding: 0.2rem;
                    }
                    .loginText {
                        font-size: 20px;
                        text-align: center;
                    }
                     `
                }</style>
        </div>
    )
}

export default Home