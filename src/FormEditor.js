import React, { useEffect, useRef, forwardRef } from 'react';
import { FormEditor as BpmnFormEditor } from '@bpmn-io/form-js';
import '@bpmn-io/form-js/dist/assets/form-js.css';
import '@bpmn-io/form-js/dist/assets/form-js-editor.css';
import emitter from './emitter';

const FormEditor = forwardRef((props) => {
  const containerRef = useRef(null);
  const formEditorRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !formEditorRef.current) {
      formEditorRef.current = new BpmnFormEditor({
        container: containerRef.current
      });

      formEditorRef.current.importSchema(props.form);
      emitter.on('submit', handleSave)
    }

    return () => {
      if (formEditorRef.current) {
        formEditorRef.current.destroy();
        formEditorRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (formEditorRef.current) {
      const result = await formEditorRef.current.getSchema();
      props.onSave(result);
    }
  };
  return <div ref={containerRef} />;
});

export default FormEditor;