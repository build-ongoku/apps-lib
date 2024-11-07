'use client';
import { useForm } from '@mantine/form';
import { AppContext } from '../../common/AppContextV3';
import { discardableInputKey, Form } from './Form';
import { GenericDtypeInput, TypeAddForm } from './FormAdd';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
export var DtypeFormWrapper = function (props) {
    var _a;
    var dtype = props.dtype;
    var appInfo = useContext(AppContext).appInfo;
    if (!appInfo) {
        throw new Error('AppInfo not loaded');
    }
    var _b = React.useState(null), response = _b[0], setResponse = _b[1];
    var form = useForm({
        mode: 'uncontrolled',
        initialValues: (_a = {},
            _a[discardableInputKey] = props.initialData || dtype.getEmptyValue(appInfo) || {},
            _a),
    });
    console.log('[DtypeFormWrapper] Rendering...', 'dtype', dtype);
    return (React.createElement(Form, { form: form, postEndpoint: props.postEndpoint, method: props.method, submitButtonText: props.submitText, redirectPath: props.redirectPath, onSuccess: function (data) {
            console.log('[TypeAddFormWrapper] [onSuccess]', 'data', data);
            setResponse(data);
        } },
        React.createElement(GenericDtypeInput, { dtype: dtype, label: "Request", form: form, identifier: discardableInputKey }),
        response && React.createElement("pre", null, JSON.stringify(response, null, 2))));
};
export var TypeAddFormWrapper = function (props) {
    var typeInfo = props.typeInfo;
    var appInfo = useContext(AppContext).appInfo;
    if (!appInfo) {
        throw new Error('AppInfo not loaded');
    }
    var _a = React.useState(null), response = _a[0], setResponse = _a[1];
    var initialData = props.initialData || typeInfo.getEmptyObject(appInfo) || {};
    // Todo: remove dependency on next/navigation
    var router = useRouter();
    var form = useForm({
        mode: 'uncontrolled',
        initialValues: initialData,
    });
    console.log('[TypeAddFormWrapper] Rendering...', 'typeInfo', typeInfo);
    return (React.createElement(Form, { form: form, submitButtonText: props.submitText, postEndpoint: props.postEndpoint, redirectPath: props.redirectPath, onSuccess: function (data) {
            console.log('[TypeAddFormWrapper] [onSuccess]', 'data', data);
            setResponse(data);
        } },
        React.createElement(TypeAddForm, { typeInfo: typeInfo, form: form }),
        response && React.createElement("pre", null, JSON.stringify(response, null, 2))));
};
