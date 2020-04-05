import App from 'next/app'
import 'antd/dist/antd.css'
import '../styles/common.scss'
import '../styles/index.scss'
import 'braft-editor/dist/index.css'
import '../static/js/rem.js'
import MyContext from  '../utils/my-content'
var socket = require('socket.io-client')('http://localhost:6001');
socket.on('connect', function(){
 console.log('connect')
});
socket.on('event', function(data){
 console.log('event');
});
socket.on('disconnect', function(){
 console.log('disconnect') 
});
class MyApp extends App {

    constructor(props) {
        super();
        this.state={
         test:'test',
          dataSelf:[],
          dataTo:[]
        }
    }
    componentWillMount(){ 
        socket.on('recMsg',(data)=>{
         console.log('收到了',data);
         this.setState({dataSelf:[...data.dataSelf],dataTo:[...data.dataTo]})
        })   
    }
    componentWillUnMount(){ 
      socket.off('recMsg')  
    }
    static async getInitialProps(ctx) {
        const {Component} = ctx
        console.log('app init')
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return {pageProps}
    }
    render() {
        const { Component, pageProps} = this.props
        return (
                    <MyContext.Provider value={{dataSelf:this.state.dataSelf,dataTo:this.state.dataTo,socket}}>
                        <Component {...pageProps}/>
                    </MyContext.Provider>
        )
    }
}

export default MyApp 