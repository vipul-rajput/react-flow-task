import React from 'react';
import { Handle, Position } from 'reactflow';
import { MessageSquareText } from 'lucide-react';

const MessageNode = ({ data, panelMode = false }) => {
  return (
    <div onClick={data.onfocus} className="card">
      <div className="card-header">
        <MessageSquareText
          size={15}
          style={{
            marginRight: '7px',
            verticalAlign: 'middle',
          }}
        />
        Send Message
      </div>
      <div className="card-body">{data.label}</div>
      {!panelMode && (
        <div>
          <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
          <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
        </div>
      )}
    </div>
  );
};

export default MessageNode;
