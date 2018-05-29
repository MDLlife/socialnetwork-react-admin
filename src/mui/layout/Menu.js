import React, { PropTypes } from 'react';
import inflection from 'inflection';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import DashboardIcon from 'material-ui/svg-icons/social/poll';
import SettingsIcon from 'material-ui/svg-icons/social/domain';
import SearchIcon from 'material-ui/svg-icons/action/search';

const Menu = ({ resources }) => (
    <Paper style={{ flex: '0 0 15em', order: -1 }}>
        <List>
            <ListItem  key="dashboard" containerElement={<Link to={`/`} />} primaryText="Dashboard" leftIcon={<DashboardIcon/>} />

            {resources.map(resource =>
                <ListItem key={resource.name} containerElement={<Link to={`/${resource.name}`} />} primaryText={resource.options.label || inflection.humanize(inflection.pluralize(resource.name))} leftIcon={<resource.icon />} />
            )}

            <ListItem key="settings" containerElement={<Link to={`/settings`} />} primaryText="Settings" leftIcon={<SettingsIcon/>} />

            <ListItem key="search" containerElement={<Link target="_blank" to={`/search`} />} primaryText="Search" leftIcon={<SearchIcon/>} />
        </List>
    </Paper>
);

Menu.propTypes = {
    resources: PropTypes.array.isRequired,
};

export default Menu;
