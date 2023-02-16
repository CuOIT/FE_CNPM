import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVoucher } from '../../actions/vouchers';
import Preloader from '../layout/Preloader';

const VoucherSearch = ({ voucher: { loading, error }, getVoucher }) => {
    const [code, setCode] = useState('');

    useEffect(() => {
        if (error !== null) {
            M.toast({ html: error.message });
        }
    }, [error]);

    const onSubmit = () => {
        if (code === '') {
            M.toast({ html: 'Please enter a valid voucher code.' });
        } else {
            // Fetch voucher
            getVoucher(code);

            // Reset field
            setCode('');
        }
    };

    // Fetching...
    if (loading) {
        return (
            <div className='center' style={{ padding: '10em' }}>
                <Preloader />
            </div>
        );
    }

    return (
        <div className='row' style={{ padding: '5em' }}>
            <div className='input-field center'>
                <input
                    type='text'
                    name='code'
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                />
                <label htmlFor='code'>Voucher Code</label>
            </div>

            <div className='modal-footer'>
                <button
                    href='#!'
                    onClick={onSubmit}
                    className='modal-close waves-effect blue waves-light btn'>
                    Enter
                </button>
            </div>
        </div>
    );
};

VoucherSearch.propTypes = {
    voucher: PropTypes.object.isRequired,
    getVoucher: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    voucher: state.voucher,
});

export default connect(mapStateToProps, { getVoucher })(VoucherSearch);