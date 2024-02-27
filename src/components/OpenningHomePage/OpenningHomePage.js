import { FormattedMessage } from 'react-intl';
import './OpenningHomePage.scss';

const OpenningHomePage = () => {
  return (
    <section className='openning'>
      <div className='openning__info'>
        <h1 className='openning__title'>
          <FormattedMessage id='home:title' />
        </h1>
        <h2 className='openning__description'>
          <FormattedMessage id='home:description' />
        </h2>
      </div>
    </section>
  );
};

export default OpenningHomePage;
