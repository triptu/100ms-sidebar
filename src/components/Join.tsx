import { HMSConfig, useHMSActions } from '@100mslive/hms-video-react';
import { Button, Form, Input, message } from 'antd';
import { getToken } from '../utils/tokenService';
import { LocalStorage } from '../utils/storage';

interface FormInput {
  tokenEndpoint: string;
  roomId: string;
  name: string;
  role: string;
  env: string;
}
const formStore = new LocalStorage<FormInput>('form-storage');

export function Join() {
  const hmsActions = useHMSActions();
  const initialValues = formStore.get();

  const config: HMSConfig = {
    userName: 'tushar',
    authToken: '',
    settings: {
      isAudioMuted: true,
      isVideoMuted: true,
    },
  };

  const join = async (values: FormInput) => {
    formStore.set(values);
    const hide = message.loading('entering the room', 0);
    console.log('values', values);
    try {
      config.authToken = await getToken(values);
      if (values.env && ['qa', 'prod'].includes(values.env)) {
        config.initEndpoint = `https://${values.env}-init.100ms.live/init`;
      }
      hmsActions.join(config);
      window.onunload = () => hmsActions.leave();
      message.success("you're in room now", 2);
    } catch (err) {
      const msg = (err as any).message || err;
      message.error(msg, 2);
    } finally {
      hide();
    }
  };

  return (
    <div className={'join-page'}>
      <h3>Enter token to join a room</h3>
      <Form name={'join-form'} onFinish={join} initialValues={initialValues}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item
          name="tokenEndpoint"
          rules={[{ required: true, message: 'Please enter token url' }]}
        >
          <Input placeholder="token endpoint" />
        </Form.Item>

        <Form.Item
          name="env"
          rules={[{ required: true, message: 'Please enter token env' }]}
        >
          <Input placeholder="env = qa/prod" />
        </Form.Item>

        <Form.Item
          name="roomId"
          rules={[{ required: true, message: 'Please enter room id' }]}
        >
          <Input placeholder="Room Id" />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please enter role' }]}
        >
          <Input placeholder="Role" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="join-button">
            Join
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
