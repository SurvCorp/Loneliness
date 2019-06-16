import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Dropdown, Modal, Form, Input, Button, Divider } from 'semantic-ui-react'

class ColorPicker extends React.Component {
    render() {
        return (
            <div>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle outline' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='red' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='orange' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='yellow' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='olive' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='green' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='teal' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='blue' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='violet' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='purple' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='pink' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='brown' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='grey' />
                    <Icon name='check' />
                </Icon.Group>
                <Icon.Group style={{marginRight: '.25rem'}}>
                    <Icon name='circle' color='black'/>
                    <Icon name='check' />
                </Icon.Group>
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
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        return (
            <Modal>
                <Modal.Header>
                    <Icon name='cog' />Page Settings
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Page name</label>
                            <Input />
                        </Form.Field>
                        <Form.Field>
                            <label>Description (optional)</label>
                            <Input />
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
                                onChange={this.handleChange}
                            />
                            <Form.Radio
                                label='Imagem'
                                value='img'
                                checked={value === 'img'}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <ColorPicker />
                        <ImagePicker />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button ok color='black' content='OK' />
                </Modal.Actions>
            </Modal>
        );
    }
}

class NewPage extends React.Component {
    render() {
        return (
            <Modal size='mini'>
                <Modal.Header>New Page</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field inline>
                            <label>Page Name</label>
                            <Input placeholder='Home' />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button ok positive content='OK' />
                    <Button cancel negative content='Cancel' />
                </Modal.Actions>
            </Modal>
        );
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <Sidebar.Pushable as='div'>
                <Settings />
                <NewPage />
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
                        <Dropdown text='Artium Dominus'>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Configurações da conta' />
                                <Dropdown.Item text='Ajuda' />
                                <Dropdown.Item>
                                    <span style={{color: 'crimson'}}>Log Out</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item as='a'>
                        <Icon name='cog' />
                        <b>Settings</b>
                    </Menu.Item>

                    <Menu.Item as='a'>
                        <Icon name='plus circle' />
                        <b>Add Frame</b>
                    </Menu.Item>

                    <Menu.Item as='a'>
                        <Icon name='plus square' />
                        <b>New Page</b>
                    </Menu.Item>

                    <Menu.Item as='div'>
                        <Menu.Header>Pages</Menu.Header> {/* Substituir pelas páginas do usuário */}
                        <Menu.Menu>
                            <Menu.Item as='a'>
                                <ins>» Home</ins>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                › Poetry
                            </Menu.Item>
                            <Menu.Item as='a'>
                                › Cubes
                            </Menu.Item>
                            <Menu.Item as='a'>
                                › Travel Book
                            </Menu.Item>
                            <Menu.Item as='a'>
                                › Gallery
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu.Item>

                    <Menu.Item as='a'>
                        « Close
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    <Segment basic> {/* Substituir conteúdo por frames */}
                        <Header as='h3'>Application Content</Header>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default Dashboard;