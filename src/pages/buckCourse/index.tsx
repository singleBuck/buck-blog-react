import React from 'react'
import { Timeline, Spin} from 'antd'
import { connect } from 'dva'
import { TimeLine } from '@/models/common.d'
import { ConnectProps } from '@/models/connect';
import { timestampToTime } from '@/utils/tool/tool'
import { TimeLineInfo } from '@/models/timelinemodel'
import styles from './index.less'

export interface buckCourseProps extends ConnectProps {
  currentLine: TimeLine;
}

class buckCourse extends React.Component<buckCourseProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'timelineModelSpace/fetchCurrentTimeLine',
    });
  }

  render() {
    const {
      currentLine : { data }
    } = this.props

    console.log(this.props)
    if(!data) return (<div className={styles.Spin}><Spin /></div>)

    const curLineList = data.list

    return (
      <div>
        <Timeline className={styles.timeline}>
          {
            curLineList.map(item => (
              <Timeline.Item
                key={ item._id }
                color={ item.state === 3 ? 'green' : 'blue' }
              >
                <div className={styles.line_content}>
                  <h3 style={{ 'color': item.color }}>{item.title}</h3>
                  <p>{item.content}</p>
                  <p>
                    <span>
                      {timestampToTime(item.start_time, false)}--
                    </span>
                    <span>
                      {' '}
                      {timestampToTime(item.end_time, false)}
                    </span>
                  </p>
                </div>
              </Timeline.Item>
            ))
          }
        </Timeline>
      </div>
    )
  }
}

export default connect(
  ({
    timelineModelSpace
  }: {
    timelineModelSpace: TimeLineInfo
  }) => ({
  currentLine: timelineModelSpace.currentLine,
})
)(buckCourse);
