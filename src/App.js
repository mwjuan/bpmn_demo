import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import BpmnEditor from './BpmnEditor';
import FormEditor from './FormEditor';
import FormPreview from './FormPreview';
import './App.css';
import emitter from './emitter';

// const initialXml = `
// <?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
//   <process id="MeetingBookingProcess" isExecutable="false">
//     <startEvent id="StartEvent" name="会议申请开始" />
//     <userTask id="FillRequest" name="填写会议申请">
//       <extensionElements>
//         <camunda:inputOutput>
//           <camunda:inputParameter name="Input_0d9bvgr">
//             <camunda:list />
//           </camunda:inputParameter>
//         </camunda:inputOutput>
//         <camunda:executionListener class="" event="start" />
//         <camunda:properties>
//           <camunda:property />
//         </camunda:properties>
//       </extensionElements>
//     </userTask>
//     <serviceTask id="CheckRoom" name="检查会议室可用性" />
//     <exclusiveGateway id="RoomCheckGateway" name="会议室可用?" />
//     <userTask id="ManagerApproval" name="主管审批" />
//     <exclusiveGateway id="ApprovalGateway" name="审批通过?" />
//     <serviceTask id="ConfirmBooking" name="确认预订" />
//     <userTask id="NotifySuccess" name="通知申请人成功" />
//     <userTask id="NotifyFailure" name="通知申请人失败" />
//     <endEvent id="EndEvent" name="流程结束" />
//     <sequenceFlow id="Flow_1" sourceRef="StartEvent" targetRef="FillRequest" />
//     <sequenceFlow id="Flow_2" sourceRef="FillRequest" targetRef="CheckRoom" />
//     <sequenceFlow id="Flow_3" sourceRef="CheckRoom" targetRef="RoomCheckGateway" />
//     <sequenceFlow id="Flow_4" sourceRef="RoomCheckGateway" targetRef="ManagerApproval">
//       <conditionExpression xsi:type="tFormalExpression">true</conditionExpression>
//     </sequenceFlow>
//     <sequenceFlow id="Flow_5" sourceRef="RoomCheckGateway" targetRef="NotifyFailure">
//       <conditionExpression xsi:type="tFormalExpression">false</conditionExpression>
//     </sequenceFlow>
//     <sequenceFlow id="Flow_6" sourceRef="ManagerApproval" targetRef="ApprovalGateway" />
//     <sequenceFlow id="Flow_7" sourceRef="ApprovalGateway" targetRef="ConfirmBooking">
//       <conditionExpression xsi:type="tFormalExpression">true</conditionExpression>
//     </sequenceFlow>
//     <sequenceFlow id="Flow_8" sourceRef="ApprovalGateway" targetRef="NotifyFailure">
//       <conditionExpression xsi:type="tFormalExpression">false</conditionExpression>
//     </sequenceFlow>
//     <sequenceFlow id="Flow_9" sourceRef="ConfirmBooking" targetRef="NotifySuccess" />
//     <sequenceFlow id="Flow_10" sourceRef="NotifySuccess" targetRef="EndEvent" />
//     <sequenceFlow id="Flow_11" sourceRef="NotifyFailure" targetRef="EndEvent" />
//   </process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_1">
//     <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="MeetingBookingProcess">
//       <bpmndi:BPMNShape id="StartEvent_di" bpmnElement="StartEvent">
//         <dc:Bounds x="100" y="100" width="36" height="36" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="85" y="136" width="66" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="FillRequest_di" bpmnElement="FillRequest">
//         <dc:Bounds x="200" y="80" width="100" height="80" />
//         <bpmndi:BPMNLabel />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="CheckRoom_di" bpmnElement="CheckRoom">
//         <dc:Bounds x="350" y="80" width="100" height="80" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="RoomCheckGateway_di" bpmnElement="RoomCheckGateway" isMarkerVisible="true">
//         <dc:Bounds x="500" y="95" width="50" height="50" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="494" y="71" width="62" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="ManagerApproval_di" bpmnElement="ManagerApproval">
//         <dc:Bounds x="600" y="80" width="100" height="80" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="ApprovalGateway_di" bpmnElement="ApprovalGateway" isMarkerVisible="true">
//         <dc:Bounds x="750" y="95" width="50" height="50" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="749" y="71" width="51" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="ConfirmBooking_di" bpmnElement="ConfirmBooking">
//         <dc:Bounds x="850" y="80" width="100" height="80" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="NotifySuccess_di" bpmnElement="NotifySuccess">
//         <dc:Bounds x="1000" y="80" width="100" height="80" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="NotifyFailure_di" bpmnElement="NotifyFailure">
//         <dc:Bounds x="725" y="310" width="100" height="80" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="EndEvent_di" bpmnElement="EndEvent">
//         <dc:Bounds x="1150" y="100" width="36" height="36" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="1146" y="76" width="44" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
//         <di:waypoint x="136" y="118" />
//         <di:waypoint x="200" y="120" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
//         <di:waypoint x="300" y="120" />
//         <di:waypoint x="350" y="120" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
//         <di:waypoint x="450" y="120" />
//         <di:waypoint x="500" y="120" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
//         <di:waypoint x="550" y="120" />
//         <di:waypoint x="600" y="120" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
//         <di:waypoint x="525" y="145" />
//         <di:waypoint x="525" y="350" />
//         <di:waypoint x="725" y="350" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
//         <di:waypoint x="700" y="120" />
//         <di:waypoint x="750" y="120" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_7_di" bpmnElement="Flow_7">
//         <di:waypoint x="800" y="120" />
//         <di:waypoint x="850" y="120" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_8_di" bpmnElement="Flow_8">
//         <di:waypoint x="775" y="145" />
//         <di:waypoint x="775" y="310" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_9_di" bpmnElement="Flow_9">
//         <di:waypoint x="950" y="120" />
//         <di:waypoint x="1000" y="120" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_10_di" bpmnElement="Flow_10">
//         <di:waypoint x="1100" y="120" />
//         <di:waypoint x="1150" y="118" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_11_di" bpmnElement="Flow_11">
//         <di:waypoint x="825" y="350" />
//         <di:waypoint x="1168" y="350" />
//         <di:waypoint x="1168" y="136" />
//       </bpmndi:BPMNEdge>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </definitions>
// `

const initialXml = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_0aui0ws" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="5.15.1">
  <bpmn:process id="Process_1" isExecutable="false" />
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1" />
  </bpmndi:BPMNDiagram>
</bpmn:definitions>

`

const initialForm = {
  "components": [
    {
      "label": "会议主题",
      "type": "textfield",
      "layout": {
        "row": "Row_1sp1gu3",
        "columns": null
      },
      "id": "Field_19ix9tj",
      "key": "subject",
      "validate": {
        "required": true
      }
    },
    {
      "subtype": "date",
      "dateLabel": "会议日期（格式：YYYY-MM-DD）",
      "type": "datetime",
      "layout": {
        "row": "Row_0je34w5",
        "columns": null
      },
      "id": "Field_03ytim1",
      "key": "date",
      "properties": {},
      "disabled": false,
      "validate": {
        "required": true
      }
    },
    {
      "subtype": "time",
      "type": "datetime",
      "layout": {
        "row": "Row_0je34w5",
        "columns": null
      },
      "id": "Field_1uotfy9",
      "key": "beginAt",
      "timeLabel": "开始时间（格式：HH:mm）",
      "timeSerializingFormat": "utc_offset",
      "timeInterval": 15,
      "use24h": true,
      "validate": {
        "required": true
      }
    },
    {
      "subtype": "time",
      "type": "datetime",
      "layout": {
        "row": "Row_0je34w5",
        "columns": null
      },
      "id": "Field_0fsc7hk",
      "key": "endAt",
      "timeLabel": "结束时间",
      "timeSerializingFormat": "utc_offset",
      "timeInterval": 15,
      "use24h": true,
      "validate": {
        "required": true
      }
    },
    {
      "label": "预订人",
      "type": "textfield",
      "id": "booker",
      "required": true,
      "key": "owner",
      "layout": {
        "row": "Row_0cskylq"
      },
      "validate": {
        "required": true
      }
    },
    {
      "label": "会议室",
      "type": "select",
      "id": "meetingRoom",
      "required": true,
      "layout": {
        "row": "Row_0cskylq"
      },
      "key": "room",
      "searchable": false,
      "properties": {},
      "validate": {
        "required": true
      },
      "valuesKey": "rooms"
    },
    {
      "label": "参会人数",
      "type": "number",
      "id": "attendeeCount",
      "required": true,
      "min": 1,
      "layout": {
        "row": "Row_0cskylq"
      },
      "key": "capacity",
      "validate": {
        "min": "1",
        "required": false
      }
    },
    {
      "label": "会议说明",
      "type": "textarea",
      "id": "meetingDescription",
      "key": "description",
      "layout": {
        "row": "Row_0qu6tw4"
      }
    },
    {
      "label": "参会人（可填写多个姓名或工号，逗号分隔）",
      "type": "textarea",
      "id": "attendees",
      "key": "attendees",
      "layout": {
        "row": "Row_0qu6tw4"
      }
    },
    {
      "label": "submit",
      "action": "submit",
      "type": "button",
      "layout": {
        "row": "Row_0wi8m2x",
        "columns": 2
      },
      "id": "Field_1v95uub"
    }
  ],
  "type": "default",
  "executionPlatform": "Camunda Platform",
  "executionPlatformVersion": "7.19.0"
}

function App() {
  const [xml, setXml] = useState(initialXml);
  const [form, setForm] = useState(initialForm);

  const handleSaveXml = (newXml) => {
    setXml(newXml);
    console.log(newXml)
  };

  const handleSaveForm = (newForm) => {
    setForm(newForm);
    console.log(newForm)
  };

  const handleSubmit = () => {
    emitter.emit('submit');
  };

  const onChange = (key) => {
    if (key === 'form-preview') {
      emitter.emit('submit');
    }
  }

  return (
    <div className="App">
      <Button
        style={{ position: 'absolute', top: 10, right: 30, zIndex: 99 }}
        type='primary'
        onClick={handleSubmit}>
        提交
      </Button>
      <main>
        <Tabs style={{ margin: 10 }} defaultActiveKey="bpmn" onChange={(e) => onChange(e)} items={[
          {
            key: 'bpmn',
            label: '流程编辑',
            children: <BpmnEditor xml={xml} onSave={handleSaveXml} />
          },
          {
            key: 'form',
            label: '表单',
            children: <FormEditor form={form} onSave={handleSaveForm} />
          },
          {
            key: 'form-preview',
            label: '预览表单',
            children: <FormPreview form={form} />
          }
        ]} />
      </main>
    </div>
  );
}

export default App;