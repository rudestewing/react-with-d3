import styles from './IntroductionSvg.module.scss'

const IntroductionSvg = () => {
  return (
    <div>
      <div> Shape with SVG and CSS </div>
      <div>
        <svg width="1000" height="1000">
          <g transform="scale(1.5)">
            <circle cx="50" cy="50" r="40"></circle>
            <rect x="100" y="20" width="50" height="50"></rect>
            <circle cx="50" cy="150" r="40" fill="red"></circle>
            <rect x="100" y="130" width="50" height="50" fill="green"></rect>
            <g transform="translate(0, 200)">
              <circle cx="50" cy="50" r="40"></circle>
              <rect x="100" y="20" width="50" height="50"></rect>
            </g>

            <g class={styles.lines}>
              <line x1="200" y1="200" x2="300" y2="280"></line>
              <path fill="none" d="M300 280 L350 200 L400 250"></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default IntroductionSvg
