import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'ui/i18n/FormattedMessage';
// import { OverlayTrigger, Popover } from 'patternfly-react';

// const helpIcon = (helpId) => {
//   const popOver = (
//     <Popover id={helpId}>
//       <p>
//         <FormattedMessage id={helpId} />
//       </p>
//     </Popover>
//   );
//   return helpId ? (
//     <span className="pull-right">
//       <OverlayTrigger
//         overlay={popOver}
//         placement="left"
//         trigger="click"
//         rootClose
//       >
//         <div>
//           <i className="PageTitle__icon fa pficon-help" />
//         </div>
//       </OverlayTrigger>
//     </span>
//   ) : null;
// };

const PageTitle = ({ titleId, titleParam }) => (
  <div className="PageTitle">
    <div className="PageTitle__header">
      <h1 className="PageTitle__title">
        <FormattedMessage id={titleId} values={{ titleParam }} />
        {
          // helpIcon(helpId)
        }
      </h1>
    </div>
  </div>
);

PageTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  // helpId: PropTypes.string,
  titleParam: PropTypes.string,
};

PageTitle.defaultProps = {
  // helpId: '',
  titleParam: '',
};

export default PageTitle;