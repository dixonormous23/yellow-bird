import styled from "styled-components";

const LoaderWrapper = styled.div`
    height: 45vh;
    width: -webkit-fill-available;
    display: flex;
    justify-content: center;
    align-items: center;
    .loader {
        width: 85px;
        height: 85px;
        border: 5px solid ${({ theme }) => theme.colors.primary};
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        animation: pulse 1s linear infinite;
    }
    .loader:after {
        content: '';
        position: absolute;
        width: 85px;
        height: 85px;
        border: 5px solid ${({ theme }) => theme.colors.primary};;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: scaleUp 1s linear infinite;
    }

    @keyframes scaleUp {
        0% { transform: translate(-50%, -50%) scale(0) }
        60% , 100% { transform: translate(-50%, -50%)  scale(1)}
    }
    @keyframes pulse {
        0% , 60% , 100%{ transform:  scale(1) }
        80% { transform:  scale(1.2)}
    }
`;

export const Loader: React.FC = () => {
    return (
        <LoaderWrapper>
            <div className="loader" />
        </LoaderWrapper>
    );
};
