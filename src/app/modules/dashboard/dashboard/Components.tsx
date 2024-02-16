import Badge from "@base/components/common/badge/Badge";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Components = () => {
    return (
        <React.Fragment>
            <div>
                <Badge pill size="xs" color="blue">
                    Blue
                </Badge>
                <Badge pill size="xs" color="gray">
                    Gray
                </Badge>
                <Badge pill size="xs" color="green">
                    Green
                </Badge>
                <Badge pill size="xs" color="indigo">
                    Indigo
                </Badge>
                <Badge pill size="xs" color="pink" link="a">
                    Pink
                </Badge>
                <Badge pill size="xs" color="purple">
                    Purple
                </Badge>
                <Badge pill size="xs" color="red">
                    Red
                </Badge>
                <Badge pill size="xs" color="yellow">
                    Yellow
                </Badge>
            </div>
            <div>
                <Badge link="#" size="sm" color="blue">
                    Blue
                </Badge>
                <Badge link="#" size="sm" color="gray">
                    Gray
                </Badge>
                <Badge link="#" size="sm" color="green">
                    Green
                </Badge>
                <Badge link="#" size="sm" color="indigo">
                    Indigo
                </Badge>
                <Badge link="#" size="sm" color="pink">
                    Pink
                </Badge>
                <Badge link="#" size="sm" color="purple">
                    Purple
                </Badge>
                <Badge link="#" size="sm" color="red">
                    Red
                </Badge>
                <Badge link="#" size="sm" color="yellow">
                    Yellow
                </Badge>
            </div>
            <div>
                <Badge size="md" color="blue">
                    Blue
                </Badge>
                <Badge size="md" color="gray">
                    Gray
                </Badge>
                <Badge size="md" color="green">
                    Green
                </Badge>
                <Badge size="md" color="indigo">
                    Indigo
                </Badge>
                <Badge size="md" color="pink" link="a">
                    Pink
                </Badge>
                <Badge size="md" color="purple">
                    Purple
                </Badge>
                <Badge size="md" color="red">
                    Red
                </Badge>
                <Badge size="md" color="yellow">
                    Yellow
                </Badge>
            </div>
            <div>
                <Badge bordered size="xs" color="blue">
                    Blue
                </Badge>
                <Badge bordered size="xs" color="gray">
                    Gray
                </Badge>
                <Badge bordered size="xs" color="green">
                    Green
                </Badge>
                <Badge bordered size="xs" color="indigo">
                    Indigo
                </Badge>
                <Badge bordered size="xs" color="pink" link="a">
                    Pink
                </Badge>
                <Badge bordered size="xs" color="purple">
                    Purple
                </Badge>
                <Badge bordered size="xs" color="red">
                    Red
                </Badge>
                <Badge bordered size="xs" color="yellow">
                    Yellow
                </Badge>
            </div>
            <div>
                <Badge bordered size="sm" color="blue">
                    Blue
                </Badge>
                <Badge bordered size="sm" color="gray">
                    Gray
                </Badge>
                <Badge bordered size="sm" color="green">
                    Green
                </Badge>
                <Badge bordered size="sm" color="indigo">
                    Indigo
                </Badge>
                <Badge bordered size="sm" color="pink" link="a">
                    Pink
                </Badge>
                <Badge bordered size="sm" color="purple">
                    Purple
                </Badge>
                <Badge bordered size="sm" color="red">
                    Red
                </Badge>
                <Badge bordered size="sm" color="yellow">
                    Yellow
                </Badge>
            </div>
            <div>
                <Badge bordered size="md" color="blue" icon={<Icon icon="bi:star-fill" />}>
                    Blue
                </Badge>
                <Badge bordered size="md" color="gray" icon={<Icon icon="bi:star-fill" />}>
                    Gray
                </Badge>
                <Badge bordered size="md" color="green" icon={<Icon icon="bi:star-fill" />}>
                    Green
                </Badge>
                <Badge bordered size="md" color="indigo" icon={<Icon icon="bi:star-fill" />}>
                    Indigo
                </Badge>
                <Badge bordered size="md" color="pink" link="a" icon={<Icon icon="bi:star-fill" />}>
                    Pink
                </Badge>
                <Badge bordered size="md" color="purple" icon={<Icon icon="bi:star-fill" />}>
                    Purple
                </Badge>
                <Badge bordered size="md" color="red" icon={<Icon icon="bi:star-fill" />}>
                    Red
                </Badge>
                <Badge bordered size="md" color="yellow" icon={<Icon icon="bi:star-fill" />}>
                    Yellow
                </Badge>
            </div>
        </React.Fragment>
    );
};

export default Components;
