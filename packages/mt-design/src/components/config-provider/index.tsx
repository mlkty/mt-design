import {createContext, useCallback, useContext, useMemo} from 'react';

interface ConfigProviderProps {
    prefixCls?: string;
    children?: React.ReactNode;
}

interface ConfigContextValue {
    getPrefixCls: (name: string, customPrefixCls?: string) => string;
}

const DEFAULT_PREFIXCLS = 'mt';

const getPrefixCls = (name: string, customPrefixCls?: string) => {
    if (customPrefixCls) {
        return customPrefixCls;
    }
    return `${DEFAULT_PREFIXCLS}-${name}`;
};

const ConfigContext = createContext<ConfigContextValue>({
    getPrefixCls,
});

const ConfigProvider = (props: ConfigProviderProps) => {
    const {prefixCls} = props;

    const getPrefixCls = useCallback(
        (name: string, customPrefixCls?: string) => {
            if (customPrefixCls) {
                return customPrefixCls;
            }
            const prefix = prefixCls ? prefixCls : DEFAULT_PREFIXCLS;
            return `${prefix}-${name}`;
        },
        [prefixCls]
    );

    const contextValue = useMemo<ConfigContextValue>(() => {
        return {
            getPrefixCls,
        };
    }, [getPrefixCls]);

    return (
        <ConfigContext.Provider value={contextValue}>
            {props.children}
        </ConfigContext.Provider>
    );
};

const useConfigContext = () => useContext(ConfigContext);

export {ConfigProvider, useConfigContext};
