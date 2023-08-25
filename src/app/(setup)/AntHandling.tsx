import { App } from 'antd';
import AntMessageHandling from './AntMessageHandling';
import StyledComponentsRegistry from './AntRegistry';
import AntStyleConfig from './AntStyleConfig';

interface Props {
	children: React.ReactNode;
}

export default function AntHandling({ children }: { children: React.ReactNode }) {
	return (
		<StyledComponentsRegistry>
			<AntStyleConfig>
				<App>
					<AntMessageHandling />
					{children}
				</App>
			</AntStyleConfig>
		</StyledComponentsRegistry>
	);
}
