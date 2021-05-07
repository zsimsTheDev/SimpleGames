import React from 'react'

import Match from './scenes/Match'

/**Will decide on the top-level view or scene
 * States:
 *      Loading
 *      Menu
 *      Match
 */
const View: React.FC = () => {
    return (
        <Match></Match>
    )
}

export default View