// const SalePage = () => {
//   //handle logic here
//   return (
//     <div>
//       <h1>This is Sale Page</h1>
//     </div>
//   );
// };
// export default SalePage;

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Preloader from './Preloader';
import PropTypes from 'prop-types';

const Vouchers = ({ voucher: { voucher, loading } }) => {
if (loading) {
    return <Preloader />;
}

if (voucher === null) {
    return <Fragment></Fragment>;
}

return (
    <Fragment>
        <p className='center blue-text darken-4'>Valid Voucher!</p>
        <table className='striped centered'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Discount</th>
                    <th>Uses Left</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{voucher.name}</td>
                    <td>
                        {voucher.percent_off
                            ? voucher.percent_off + '%'
                            : 'RM ' + voucher.flat_off}
                    </td>
                    <td>{voucher.remaining}</td>
                </tr>
            </tbody>
        </table>
    </Fragment>
);
};

Vouchers.propTypes = {
voucher: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
voucher: state.voucher,
});

export default connect(mapStateToProps)(Vouchers);