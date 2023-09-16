import { App } from 'antd';
import AntMessageHandling from './AntMessageHandling';
import AntRegistry from './AntRegistry';
import AntStyleConfig from './AntStyleConfig';

interface Props {
	children: React.ReactNode;
}

export default function AntHandling({ children }: Props) {
	return (
		<AntRegistry>
			<AntStyleConfig>
				<App>
					<AntMessageHandling />
					{children}
				</App>
			</AntStyleConfig>
		</AntRegistry>
	);
}
