import React, {Component, PropTypes} from 'react';

import CodeBlock from './CodeBlock';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';

class CodeExample extends Component {
    static propTypes = {
        children: PropTypes.node,
        code: PropTypes.string.isRequired,
        component: PropTypes.bool,
        description: PropTypes.string,
        exampleBlockStyle: React.PropTypes.object,
        layoutSideBySide: PropTypes.bool,
        title: PropTypes.string,
    };

    static defaultProps = {
        component: true,
    };

    static contextTypes = {
        muiTheme: PropTypes.object,
    };

    render() {
        const {
            children,
            code,
            component,
            exampleBlockStyle,
            layoutSideBySide,
        } = this.props;

        const palette = this.context.muiTheme.rawTheme.palette;
        const canvasColor = palette.canvasColor;

        const styles = {
            root: {
                backgroundColor: canvasColor,
                marginBottom: 2,
            },
            exampleBlock: {
                borderRadius: '0 0 2px 0',
                padding: '4px 4px',
                margin: 0,
                width: layoutSideBySide ? '25%' : null,
                float: layoutSideBySide ? 'left' : null,
            },
        };

        const docs = component;

        return (
            <Paper style={styles.root}>
                <CodeBlock
                    title={this.props.title}
                    description={this.props.description || docs.description}
                >
                    {code}
                </CodeBlock>
                <ClearFix style={Object.assign(styles.exampleBlock, exampleBlockStyle)}>{children}</ClearFix>
            </Paper>
        );
    }
}

export default CodeExample;