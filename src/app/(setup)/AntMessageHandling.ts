'use client';

import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { memo } from 'react';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: ModalStaticFunctions;

export default memo(function AntMessageHandling() {
	const staticFunction = App.useApp();
	message = staticFunction.message;
	modal = { ...staticFunction.modal, warn: staticFunction.modal.warning };
	notification = staticFunction.notification;

	return null;
});

export { message, modal, notification };
