import * as React from 'react';
import { TranslationFunction } from 'i18next';
import { translate } from 'react-i18next';
import { formatNumber } from '../shared/utils';

export interface Props {
  readonly totalCount: number;
  // readonly large: boolean;
  readonly minimal?: boolean;
  readonly t: TranslationFunction;
}

export const CallCount: React.StatelessComponent<Props> = (props: Props) => {

  const closestTenPower = Math.pow(10, Math.ceil(Math.log10(props.totalCount + 1)));

  let callGoal = closestTenPower;
  if (closestTenPower / 2 > (props.totalCount)) {
    callGoal = Math.round(closestTenPower / 2);
  }

  const pctDone = (props.totalCount / callGoal) * 100;
  const pctStyle = {width: `${pctDone - 2}%`};
  const totalCalls = formatNumber(props.totalCount);

  const callText = props.minimal ?
    `${totalCalls} Calls`
    :
    `Together we've made ${totalCalls} Calls!`;

  return (
    <div className="progress-block">
      <div className="progress__label">{callText}</div>
      <div className="progress progress__large">
        <p className="totaltext">{totalCalls}</p>
        <span className="progress__border">&nbsp;</span>
        <span style={pctStyle} className="progress__total" />
      </div>
      <div className="progress__goal">Goal: {formatNumber(callGoal)}</div>
    </div>
  );
};

export default translate()(CallCount);
