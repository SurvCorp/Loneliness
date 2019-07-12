import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Dropdown, Modal, Form, Input, Button, Divider, Container } from 'semantic-ui-react'
import Frame from './Frame'
import { Route } from 'react-router-dom';

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DnDtest from './Container'

class Color extends React.Component {
    render() {
        return this.props.color == "white" ? (
            <Icon.Group style={{marginRight: '.25rem'}}>
                <Icon name='circle outline' />
                <Icon name='check' />
            </Icon.Group>
        ) : (
            <Icon.Group style={{marginRight: '.25rem'}}>
                <Icon name='circle' color={this.props.color} />
                <Icon name='check' />
            </Icon.Group>
        )
    }
}

class ColorPicker extends React.Component {
    render() {
        const colors = ['white', 'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
        return (
            <div>
                {colors.map( color => <Color color={color} key={color} /> )}
            </div>
        );
    }
}

class ImagePicker extends React.Component {
    render() {
        return (
            <div>
                <Image src='cyberpunk-wallpaper.jpg' alt='Background preview' size='medium' spaced='right'/> {/* Substituir pelo Background do usuário */}
                <Button.Group vertical labeled icon style={{position: 'absolute', bottom: '30px'}}>
                    <Button icon='images' content='Escolher da Galeria' />
                    <Button icon='upload' content='Upload' />
                    <Button color='black' content='Pesquisar no Unsplash' />
                </Button.Group>
            </div>
        );
    }
}

const types = [
    {
        key: 'Public',
        text: 'Public',
        value: 'Public',
    },
    {
        key: 'Friends',
        text: 'Friends',
        value: 'Friends',
    },
    {
        key: 'Private',
        text: 'Private',
        value: 'Private',
    },
]

const layouts = [
    {
        key: 'Free',
        text: 'Free',
        value: 'Free',
    },
    {
        key: 'Grid',
        text: 'Grid',
        value: 'Grid',
    },
    {
        key: 'Article',
        text: 'Article',
        value: 'Article',
    },
]

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: null};
        this.state.page = this.props.page;
    }

    handleNameChange = (event) => {
        const { page } = this.state;
        page.title = event.target.value;
        this.setState({page, });
    }

    handleDescriptionChange = (event) => {
        const { page } = this.state;
        page.description = event.target.value;
        this.setState({page, });
    }

    handleRadioChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        return (
            <Modal trigger={
                <Menu.Item as='a'>
                    <Icon name='cog' />
                    <b>Settings</b>
                </Menu.Item>
            }>
                <Modal.Header>
                    <Icon name='cog' />Page Settings
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Page name</label>
                            <Input value={this.state.page.title} onChange={this.handleNameChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Description (optional)</label>
                            <Input value={this.state.page.description} onChange={this.handleDescriptionChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Page type</label>
                            <Form.Dropdown 
                                placeholder='Select Type'
                                selection
                                options={types}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Layout</label>
                            <Form.Dropdown 
                                placeholder='Select Layout'
                                selection
                                options={layouts}
                            />
                        </Form.Field>
                        <Divider />
                        <Form.Group inline>
                            <label>Background: </label>
                            <Form.Radio
                                label='Cor'
                                value='cor'
                                checked={value === 'cor'}
                                onChange={this.handleRadioChange}
                            />
                            <Form.Radio
                                label='Imagem'
                                value='img'
                                checked={value === 'img'}
                                onChange={this.handleRadioChange}
                            />
                        </Form.Group>
                        <ColorPicker />
                        <ImagePicker />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button ok='true' color='black' content='OK' />
                </Modal.Actions>
            </Modal>
        );
    }
}

class NewPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: {
                title: "",
                url: "https://pt.wikipedia.org/",
                description: "No description.",
                visibility: "PUBLIC",
                backgroundColor: "white"
            },
            modalOpen: false
        }
    }

    handleOpen = () => this.setState({ modalOpen: true});

    handleClose = () => this.setState({ modalOpen: false });

    handleNameChange = (event) => {
        const { page } = this.state;
        page.title = event.target.value;
        this.setState({page, });
    }

    handleOK = () => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState === 4 && request.status === 201) {
                this.props.reloadPages();
                this.handleClose();
                const { page } = this.state;
                page.title = "";
                this.setState({page, });
            }
        }
        request.open("POST", "http://127.0.0.1:8000/pages/", true);
        request.setRequestHeader("Content-Type", "application/json")
        request.setRequestHeader("Authorization", this.props.token);
        request.send(JSON.stringify(this.state.page));
    }

    handleCancel = () => {
        this.handleClose();
        const { page } = this.state;
        page.title = "";
        this.setState({page, });
    }

    render() {
        return (
            <Modal 
                size='mini'
                trigger={
                    <Menu.Item as='a' onClick={this.handleOpen}>
                        <Icon name='plus square' />
                        <b>New Page</b>
                    </Menu.Item>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>New Page</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field inline>
                            <label>Page Name</label>
                            <Input placeholder='Home' value={this.state.page.title} onChange={this.handleNameChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button ok="true" positive content='OK' onClick={this.handleOK} />
                    <Button cancel="true" negative content='Cancel' onClick={this.handleCancel}/>
                </Modal.Actions>
            </Modal>
        );
    }
}

class PageLink extends React.Component {
    render() {
        return (
            this.props.main === this.props.id ? (
                <Menu.Item as='a' onClick={() => this.props.goTo(this.props.page)}>
                    <ins>» {this.props.title}</ins>
                </Menu.Item>
            ) : (
                <Menu.Item as='a' onClick={() => this.props.goTo(this.props.page)}>
                    › {this.props.title}
                </Menu.Item>
            )
        );
    }
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {user: {username: null, email: null}, pages: [], page: null, frames: []};

        var requestuser = new XMLHttpRequest();
        requestuser.onreadystatechange = (e) => {
            if (requestuser.readyState === 4 && requestuser.status === 200) {
                this.setState({user: JSON.parse(requestuser.responseText)});
            }
        }
        requestuser.open("GET", "http://127.0.0.1:8000/auth/user/", true);
        requestuser.setRequestHeader("Authorization", this.props.token);
        requestuser.send();

        var requestpage = new XMLHttpRequest();
        requestpage.onreadystatechange = (e) => {
            if (requestpage.readyState === 4 && requestpage.status === 200) {
                let pages = JSON.parse(requestpage.responseText);
                if (pages.length > 0) {
                    this.setState({page: pages[0]});

                    var requestframes = new XMLHttpRequest();
                    requestframes.onreadystatechange = (e) => {
                        if (requestframes.readyState === 4 && requestframes.status === 200) {
                            this.setState({frames: JSON.parse(requestframes.responseText)});
                        }
                    };
                    requestframes.open("GET", "http://127.0.0.1:8000/pages/" + this.state.page.id + "/components/", true);
                    requestframes.setRequestHeader("Authorization", this.props.token);
                    requestframes.send();
                }
                this.setState({pages: pages});                
            }
        }
        requestpage.open("GET", "http://127.0.0.1:8000/pages/", true);
        requestpage.setRequestHeader("Authorization", this.props.token);
        requestpage.send();
    }

    handleLogout = () => {
        this.props.auth.logout();
    }

    reloadPages = () => {
        var requestpage = new XMLHttpRequest();
        requestpage.onreadystatechange = (e) => {
            if (requestpage.readyState === 4 && requestpage.status === 200) {
                this.setState({pages: JSON.parse(requestpage.responseText)});
            }
        }
        requestpage.open("GET", "http://127.0.0.1:8000/pages/", true);
        requestpage.setRequestHeader("Authorization", this.props.token);
        requestpage.send();
    }

    handleAddFrame = () => {
        const frame = {
            name: "New Frame",
            description: "What is in your mind, " + this.state.user.username + "?",
            x: 500,
            y: 350
        }

        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState === 4 && request.status === 201) {
                var requestframes = new XMLHttpRequest();
                requestframes.onreadystatechange = (e) => {
                    if (requestframes.readyState === 4 && requestframes.status === 200) {
                        this.setState({frames: JSON.parse(requestframes.responseText)});
                    }
                };
                requestframes.open("GET", "http://127.0.0.1:8000/pages/" + this.state.page.id + "/components/", true);
                requestframes.setRequestHeader("Authorization", this.props.token);
                requestframes.send();
            } else if (request.readyState === 4 && request.status === 400) {
                console.log(request.responseText);
            }
        }
        request.open("POST", "http://127.0.0.1:8000/pages/" + this.state.page.id + "/components/", true);
        request.setRequestHeader("Authorization", this.props.token);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(frame));
    }

    goTo = (page) => {
        this.setState({page: page});
        var requestframes = new XMLHttpRequest();
        requestframes.onreadystatechange = (e) => {
            if (requestframes.readyState === 4 && requestframes.status === 200) {
                this.setState({frames: JSON.parse(requestframes.responseText)});
            }
        };
        requestframes.open("GET", "http://127.0.0.1:8000/pages/" + this.state.page.id + "/components/", true);
        requestframes.setRequestHeader("Authorization", this.props.token);
        requestframes.send();
    }

    toObj(frames) {
        let obj = {};
        for (let i = 0; i < frames.length; ++i) {
            obj[frames[i].id] = {
                name: frames[i].name,
                content: frames[i].description,
                left: parseInt(frames[i].x),
                top: parseInt(frames[i].y),
            }
        }
        console.log(obj);
        return obj;
    }

    render() {
        return (
            <Sidebar.Pushable as='div'>
                <Sidebar as={Menu} animation='push' inverted vertical visible>
                    <Menu.Item as='div'>
                        <a className="ui logo icon image" href="#">
                            <img src="crow-grey-silhouette.svg" alt='Loneliness Logo' style={{width: '40px', height: '40px'}} />
                        </a>
                        <a href="#" style={{marginLeft: '10px'}}>
                            <b>Loneliness</b>
                        </a>
                    </Menu.Item>

                    <Menu.Item as='div'>
                        <Dropdown text={this.state.user.username}>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Configurações da conta' />
                                <Dropdown.Item text='Ajuda' />
                                <Route render={({ history }) => (
                                    <Dropdown.Item onClick={ () => { this.handleLogout(); history.push('/'); } } >
                                        <span style={{color: 'crimson'}}>Log Out</span>
                                    </Dropdown.Item>
                                )} />
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    { this.state.page != null ? <Settings page={this.state.page} /> : null }

                    <Menu.Item as='a' onClick={this.handleAddFrame}>
                        <Icon name='plus circle' />
                        <b>Add Frame</b>
                    </Menu.Item>

                    <NewPage token={this.props.token} reloadPages={this.reloadPages} />

                    <Menu.Item as='div'>
                        <Menu.Header>Pages</Menu.Header> {/* Substituir pelas páginas do usuário */}
                        <Menu.Menu>
                            {this.state.pages.map( (page) => <PageLink key={page.id} title={page.title} main={this.state.page.id} page={page} goTo={this.goTo}/> )}
                        </Menu.Menu>
                    </Menu.Item>

                    <Menu.Item as='a'>
                        « Close
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    {/*
                    <Segment basic>
                        <Header as='h3'>Application Content</Header>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
                    */}
                    {/*
                    <DndProvider backend={HTML5Backend}>
                        <DnDtest hideSourceOnDrag="true" framesObj={this.toObj(this.state.frames)}/>
                    </DndProvider>
                    */}
                    {
                        this.state.frames.map(
                            (frame) => <Frame 
                                key={frame.id}
                                name={frame.name}
                                content={frame.description}
                                x={frame.x}
                                y={frame.y}
                            />
                        )
                    }
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default Dashboard;