import React, { FC } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Avatar } from 'antd';
import { timestampToTime } from '@/utils/tool/tool';
import { UserOutlined } from '@ant-design/icons';
import { commentsList, thirdCommentInfo } from '@/models/common.d';
import CommentArea from '@/components/commentArea';
import styles from './index.less';

interface basicCommentListProps {
  list: commentsList[];
  commentNumber: number;
  commentInfo: {
    article?: string;
    user: string;
  };
  message?: boolean;
  thirdCommentSend: (val: thirdCommentInfo) => void;
}
const CommentList: FC<basicCommentListProps> = props => {
  const { list, commentNumber, commentInfo, thirdCommentSend, message } = props;

  const sendReply = (val: string, item: any, comment_id: string): void => {
    const { user_id, avatar, name, type } = item.user;

    const [
      userId, userName
    ]  =  [
      user_id.length === 0 ? item._id : user_id,
      name.length === 0 ? item.name : name
    ]

    let thirdPam = {
      user_id: commentInfo.user ? commentInfo.user : '',
      comment_id: comment_id,
      content: val,
      to_user: {
        user_id: userId,
        avatar,
        name: userName,
        type,
      },
    };

    const pam = message
      ? thirdPam
      : Object.assign({},thirdPam, { article_id: commentInfo.article } )
    if (thirdCommentSend) {
      thirdCommentSend(pam as thirdCommentInfo);
    }
  };

  const adminAvator = (pm: boolean | undefined, cur: any) => {
    const el = <span className={styles.ant_author}>博主</span>
    if(!pm) {
      return cur.user.type === 0 ? el : ''
    }else {
      return cur.type === 0 ? el : ''
    }
  }

  return (
    <div className={styles.comment_list}>
      <div className={styles.top_title}>
        <span>{commentNumber} 条评论</span>
      </div>
      {list.length > 0 ? (
        list.map(item => (
          <ReactCSSTransitionGroup
            key={item._id}
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            <div className={styles.item}>
              <div className={styles.item_header}>
                <div className={styles.author}>
                  <div className={styles.avator}>
                    <Avatar size={45} src={message ? item.avatar : item.user.avatar} icon={<UserOutlined />} />
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>
                    {message ? item.name : item.user.name}
                    {adminAvator(message, item)}
                  </div>
                  <div className={styles.time}>
                    {item.create_time ? timestampToTime(item.create_time, true) : ''}
                  </div>
                </div>
              </div>
              <div className={styles.comment_detail}>{item.content}</div>
              <CommentArea sendReply={sendReply} curItem={item} commentId={item._id} />
              {item.other_comments.map(el => (
                <div key={el._id} className={styles.item_other}>
                  <div className={styles.item_header}>
                    <div className={styles.author}>
                      <div className={styles.avator}>
                        <Avatar size={45} src={el.user.avatar} icon={<UserOutlined />} />
                      </div>
                    </div>
                    <div className={styles.info}>
                      <div className={styles.name}>
                        {el.user.name}
                        {el.user.type === 0 ? (
                          <span className={styles.ant_author}>博主</span>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className={styles.time}>
                        {el.create_time ? timestampToTime(el.create_time, true) : ''}
                      </div>
                    </div>
                  </div>
                  <div className={styles.comment_detail}>
                    {<span className={styles.ant_info_others}>
                      {'@' + el.to_user.name}
                      {el.to_user.type === 0 ? <span className={styles.ant_author}>博主</span> : ''}
                    </span>}
                    {el.content}
                  </div>
                  <CommentArea sendReply={sendReply} curItem={el} commentId={item._id} />
                </div>
              ))}
            </div>
          </ReactCSSTransitionGroup>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CommentList;
