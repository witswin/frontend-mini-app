export const Calendar = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1.5V3.5M4 1.5V3.5M2 5.5H10M2 3.5C2 3.23478 2.10536 2.98043 2.29289 2.79289C2.48043 2.60536 2.73478 2.5 3 2.5H9C9.26522 2.5 9.51957 2.60536 9.70711 2.79289C9.89464 2.98043 10 3.23478 10 3.5V9.5C10 9.76522 9.89464 10.0196 9.70711 10.2071C9.51957 10.3946 9.26522 10.5 9 10.5H3C2.73478 10.5 2.48043 10.3946 2.29289 10.2071C2.10536 10.0196 2 9.76522 2 9.5V3.5ZM4 7.5H5V8.5H4V7.5Z"
      stroke="url(#paint0_linear_556_314)"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_556_314"
        x1="6"
        y1="9.47727"
        x2="1.15641"
        y2="-2.22858"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#63C6E1" />
        <stop offset="1" stop-color="#9227FF" />
      </linearGradient>
    </defs>
  </svg>
);

export const Clock = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 7L6 6V3.5M1.5 6C1.5 6.59095 1.6164 7.17611 1.84254 7.72208C2.06869 8.26804 2.40016 8.76412 2.81802 9.18198C3.23588 9.59984 3.73196 9.93131 4.27792 10.1575C4.82389 10.3836 5.40905 10.5 6 10.5C6.59095 10.5 7.17611 10.3836 7.72208 10.1575C8.26804 9.93131 8.76412 9.59984 9.18198 9.18198C9.59984 8.76412 9.93131 8.26804 10.1575 7.72208C10.3836 7.17611 10.5 6.59095 10.5 6C10.5 5.40905 10.3836 4.82389 10.1575 4.27792C9.93131 3.73196 9.59984 3.23588 9.18198 2.81802C8.76412 2.40016 8.26804 2.06869 7.72208 1.84254C7.17611 1.6164 6.59095 1.5 6 1.5C5.40905 1.5 4.82389 1.6164 4.27792 1.84254C3.73196 2.06869 3.23588 2.40016 2.81802 2.81802C2.40016 3.23588 2.06869 3.73196 1.84254 4.27792C1.6164 4.82389 1.5 5.40905 1.5 6Z"
      stroke="url(#paint0_linear_556_179)"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_556_179"
        x1="6"
        y1="9.47727"
        x2="1.55831"
        y2="-2.59909"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#63C6E1" />
        <stop offset="1" stop-color="#9227FF" />
      </linearGradient>
    </defs>
  </svg>
);

export const Home = ({ isActive = false }: { isActive: boolean }) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 19V13C7.5 12.4696 7.71071 11.9609 8.08579 11.5858C8.46086 11.2107 8.96957 11 9.5 11H11.5C12.0304 11 12.5391 11.2107 12.9142 11.5858C13.2893 11.9609 13.5 12.4696 13.5 13V19M3.5 10H1.5L10.5 1L19.5 10H17.5V17C17.5 17.5304 17.2893 18.0391 16.9142 18.4142C16.5391 18.7893 16.0304 19 15.5 19H5.5C4.96957 19 4.46086 18.7893 4.08579 18.4142C3.71071 18.0391 3.5 17.5304 3.5 17V10Z"
      stroke={isActive ? "url(#paint0_linear_797_629)" : "#DEDEE1"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    {isActive && (
      <defs>
        <linearGradient
          id="paint0_linear_797_629"
          x1="10.5"
          y1="16.9545"
          x2="1.61663"
          y2="-7.19817"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#63C6E1" />
          <stop offset="1" stop-color="#9227FF" />
        </linearGradient>
      </defs>
    )}
  </svg>
);

export const QuizIcon = ({ isActive = false }: { isActive: boolean }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.52 17.5197C11.179 18.2557 8.52 18.1257 6.2 16.9997L1.5 17.9997L2.8 14.0997C0.476 10.6627 1.374 6.22772 4.9 3.72572C8.426 1.22472 13.49 1.42972 16.745 4.20572C18.394 5.61272 19.32 7.45872 19.487 9.35772M17.5 19.9998V20.0098M17.5 16.9998C17.9483 16.9983 18.3832 16.8466 18.735 16.5687C19.0868 16.2909 19.3352 15.903 19.4406 15.4673C19.5459 15.0315 19.5019 14.5731 19.3158 14.1652C19.1297 13.7574 18.8122 13.4238 18.414 13.2178C18.0162 13.014 17.5611 12.9508 17.1228 13.0385C16.6845 13.1262 16.2888 13.3596 16 13.7008"
      stroke={isActive ? "url(#paint0_linear_797_3885)" : "#DEDEE1"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    {isActive && (
      <defs>
        <linearGradient
          id="paint0_linear_797_3885"
          x1="10.4983"
          y1="17.9607"
          x2="1.58648"
          y2="-6.22278"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#63C6E1" />
          <stop offset="1" stop-color="#9227FF" />
        </linearGradient>
      </defs>
    )}
  </svg>
);

export const LearnIcon = ({ isActive = false }: { isActive: boolean }) => (
  <svg
    width="17"
    height="20"
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 1H12.5C13.2956 1 14.0587 1.31607 14.6213 1.87868C15.1839 2.44129 15.5 3.20435 15.5 4V15M11.5 8V19L6.5 16L1.5 19V8C1.5 7.20435 1.81607 6.44129 2.37868 5.87868C2.94129 5.31607 3.70435 5 4.5 5H8.5C9.29565 5 10.0587 5.31607 10.6213 5.87868C11.1839 6.44129 11.5 7.20435 11.5 8Z"
      stroke={isActive ? "url(#paint0_linear_797_3885)" : "#DEDEE1"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    {isActive && (
      <defs>
        <linearGradient
          id="paint0_linear_797_1132"
          x1="8.5"
          y1="16.9545"
          x2="-2.09686"
          y2="-5.45437"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#63C6E1" />
          <stop offset="1" stop-color="#9227FF" />
        </linearGradient>
      </defs>
    )}
  </svg>
);

export const ProfileIcon = ({ isActive = false }: { isActive: boolean }) => (
  <svg
    width="15"
    height="20"
    viewBox="0 0 15 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 19V17C1.5 15.9391 1.92143 14.9217 2.67157 14.1716C3.42172 13.4214 4.43913 13 5.5 13H9.5C10.5609 13 11.5783 13.4214 12.3284 14.1716C13.0786 14.9217 13.5 15.9391 13.5 17V19M3.5 5C3.5 6.06087 3.92143 7.07828 4.67157 7.82843C5.42172 8.57857 6.43913 9 7.5 9C8.56087 9 9.57828 8.57857 10.3284 7.82843C11.0786 7.07828 11.5 6.06087 11.5 5C11.5 3.93913 11.0786 2.92172 10.3284 2.17157C9.57828 1.42143 8.56087 1 7.5 1C6.43913 1 5.42172 1.42143 4.67157 2.17157C3.92143 2.92172 3.5 3.93913 3.5 5Z"
      stroke={isActive ? "url(#paint0_linear_797_3885)" : "#DEDEE1"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    {isActive && (
      <defs>
        <linearGradient
          id="paint0_linear_797_1782"
          x1="7.5"
          y1="16.9545"
          x2="-4.09762"
          y2="-4.06706"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#63C6E1" />
          <stop offset="1" stop-color="#9227FF" />
        </linearGradient>
      </defs>
    )}
  </svg>
);
