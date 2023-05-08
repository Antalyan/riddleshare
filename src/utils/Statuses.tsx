import {
	CancelRounded,
	CheckCircleOutlineRounded,
	HelpOutlineRounded,
	Lock
} from '@mui/icons-material';

export enum RiddleStatus {
	'Untouched',
	'Unfinished',
	'Solved'
}

const riddleStateIconStyle = {
	position: 'absolute',
	right: 0,
	top: 0,
	m: 1,
	p: 0.1,
	backgroundColor: 'background.default',
	borderRadius: '50%'
};
export const getRiddleStateIcon = (state: RiddleStatus) => {
	switch (state) {
		case RiddleStatus.Unfinished:
			return <HelpOutlineRounded color="warning" sx={riddleStateIconStyle} />;
		case RiddleStatus.Solved:
			return (
				<CheckCircleOutlineRounded color="success" sx={riddleStateIconStyle} />
			);
		default:
			return <CancelRounded color="error" sx={riddleStateIconStyle} />;
	}
};

const questionStateIconStyle = {
	backgroundColor: 'background.default',
	borderRadius: '50%'
};

export const getQuestionStateIcon = (solved: boolean, available: boolean) => {
	if (!available) {
		return <Lock sx={questionStateIconStyle} />;
	}
	if (solved) {
		return (
			<CheckCircleOutlineRounded color="success" sx={questionStateIconStyle} />
		);
	}
	return <HelpOutlineRounded color="warning" sx={questionStateIconStyle} />;
};
