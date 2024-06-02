import React from 'react';
import { CircleArrowLeft } from 'lucide-react';
const ConfigPanel = ({ nodeId, updateNodeLabel, onClose }) => {
    const handleLabelChange = (e) => {
        updateNodeLabel(nodeId, e.target.value);
    };
    return (
        <aside className="node-panel">
            <div className='node-panel-header'>
                <button onClick={onClose} >
                    <CircleArrowLeft size={22} />
                </button>
                <h4>Node Config Panel</h4>
            </div>
            <h4>
                Text:
            </h4>
            <textarea
                className='node-field'
                type="text"
                placeholder="Message..."
                value={nodeId.label}
                onChange={handleLabelChange}
            />
        </aside>
    );
};

export default ConfigPanel;
