import React, { useEffect, useRef } from 'react';
import { Form } from '@bpmn-io/form-js';
import '@bpmn-io/form-js/dist/assets/form-js.css';

const FormPreview = ({ form }) => {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && form) {
      if (formRef.current) {
        formRef.current.destroy();
      }
      formRef.current = new Form({
        container: containerRef.current
      });

      formRef.current.importSchema(form, {
        rooms: [
          { label: '会议室1', value: 'room1' },
          { label: '会议室2', value: 'room2' },
          { label: '会议室3', value: 'room3' }
        ]
      }).then(() => {
        console.log('表单初始化完成');
      }).catch(error => {
        console.error('表单初始化错误:', error);
      });

      formRef.current.on('submit', (event) => {
        alert('提交数据: ' + JSON.stringify(event.data, null, 2));
      });
    }
    return () => {
      if (formRef.current) {
        formRef.current.destroy();
        formRef.current = null;
      }
    };
  }, [form]);

  return <div ref={containerRef} style={{ width: '100vw', height: '40vh', background: '#fafafa' }} />;
};

export default FormPreview; 