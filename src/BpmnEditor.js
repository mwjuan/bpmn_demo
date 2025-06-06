import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
} from 'bpmn-js-properties-panel';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import '@bpmn-io/properties-panel/dist/assets/properties-panel.css';
import emitter from './emitter';

const BpmnEditor = ({ xml, onSave }) => {
  const containerRef = useRef(null);
  const bpmnModelerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    emitter.on('submit', handleSave)
    const modeler = new BpmnModeler({
      container: containerRef.current,
      propertiesPanel: {
        parent: '#properties-panel'
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule,
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });

    bpmnModelerRef.current = modeler;

    if (xml) {
      modeler.importXML(xml)
        .then(() => {
          console.log('Diagram imported successfully');
        })
        .catch(err => {
          console.error('Error importing diagram', err);
        });
    }

    return () => {
      modeler.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xml]);

  const handleSave = async () => {
    try {
      const { xml: savedXml } = await bpmnModelerRef.current.saveXML({ format: true });
      if (onSave) {
        onSave(savedXml);
      }
    } catch (err) {
      console.error('Error saving BPMN diagram', err);
    }
  };

  return (
    <div className="bpmn-editor-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div
          ref={containerRef}
          className="bpmn-container"
          style={{ flex: 1, borderRight: '1px solid #ccc' }}
        ></div>
        <div
          id="properties-panel"
          style={{ width: '300px', overflow: 'auto' }}
        ></div>
      </div>
    </div>
  );
};

export default BpmnEditor;