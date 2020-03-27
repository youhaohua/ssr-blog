import {Input, Button,message} from 'antd'
const {TextArea} = Input
    import React, {useRef, useEffect, useState} from 'react'
    import dynamic from 'next/dynamic'
    import {addBlog} from "../api/blog"

    const DynamicBraftEditor = dynamic(import ('braft-editor'), {ssr: false})

    const Release = () => {
        const [content,
            setContent] = useState(null)
        const [title,
            setTitle] = useState(null)
        const [author,
            setAuthor] = useState(null)
        const handleEditorChange = (v) => {
            setContent((content) => v)
            console.log(v)
        }
        const submitContent = async() => {
            const htmlContent = content.toHTML();
            const params = {
                content:htmlContent,
                title,
                author
            }
            addBlog(params).then(res=>{
             console.log('新增博客',res);
             if(!res.errno){ 
                message.info('新增成功')
             }
             })
            console.log("1", htmlContent)
        }
        const handleAuthorChange = (e) => {
            e.persist()
            setAuthor(author => e.target.value)
        }
        const handleTitleChange = (e) => {
            e.persist()
            setTitle(title => e.target.value)
            console.log('作者', e.target.value)
        }
        return (
            <div
                style={{
                width: "1000px",
                margin: "0 auto",
                padding: "20px"
            }}>
                <Input
                    className="marginBottom"
                    onChange={handleTitleChange}
                    style={{
                    marginTop: "50px"
                }}
                    placeholder="文章标题"/>
                <Input className="marginBottom" onChange={handleAuthorChange} placeholder="作者"/>
                <div
                    style={{
                    border: '1px solid #d9d9d9'
                }}>
                    <DynamicBraftEditor value={content} onChange={handleEditorChange}/>
                </div>
                <Button
                    type="primary"
                    style={{
                    marginTop: "20px"
                }}
                    onClick={submitContent}>发布</Button>
                <style jsx>{` 
                     input.marginBottom {
                            margin-bottom: 20px;
                        }
                         `
               }</style>
            </div>
        )
    }

    Release.getInitialProps = (ctx) => {
        return {}
    }

    export default Release
