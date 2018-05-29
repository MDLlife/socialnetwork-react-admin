import React from 'react';
import {Card} from 'material-ui/Card';

const InputList = ({ record, inputs, resource, handleChange, basePath }) => (
    <div>
        <Card style={{padding: '20px'}}>
    {record ?
        React.Children.map(inputs, input => (
            <div key={input.props.source}>
                <input.type
                    {...input.props}
                    resource={resource}
                    record={record}
                    onChange={handleChange}
                    basePath={basePath}
                />
            </div>
        ))
        :
        null
    }
        </Card>
    </div>
);

export default InputList;
