import { FormattedMessage } from 'react-intl';
import './JoinNowHomePage.scss';

const JoinNowHomePage = () => {
  return (
    <section className='join'>
      <div className='join__info'>
        <h1 className='join__title'>
          <FormattedMessage id='home:join_title' />
        </h1>
        <h2 className='join__description'>
          <FormattedMessage id='home:join_description' />
        </h2>
      </div>
    </section>
  );
};

export default JoinNowHomePage;
