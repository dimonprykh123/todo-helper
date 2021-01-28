import React from "react";
import {NavLink} from "react-router-dom";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import ScrollableAnchor, {configureAnchors} from 'react-scrollable-anchor'

const Info = () => {
    configureAnchors({offset: -60, scrollDuration: 1000})
    return (
        <div className="row s12 m12 l12">
                <div className="row">
                    <div className="col s12 m6 l6">
                        <div className="card blue-grey darken-4">
                            <div className="card-content white-text">
                                <span className="card-title">About this app</span>
                                <p>
                                    Greetings traveler! if you read this text , you have to know , I am so much obliged
                                    to you , that you have visited my web-application :) !!!
                                </p>
                                <p>
                                    This web-application was made to help people manage their tasks with comfort and
                                    don`t spend more than necessary time for it . Well , let`s not waste time then and start
                                     our work with application.
                                </p>
                                    <h5>Usage guidelines</h5>
                                <ul>
                                    <li>
                                        <p>All categories and tasks you can add at <NavLink to="/main"><a
                                            className="info_links">main</a></NavLink> page :</p>
                                        <p>
                                            <div><i
                                                className="material-icons btn-floating pulse yellow imp center-align">priority_high</i><code> -
                                                means important task ;</code></div>
                                            <div><i
                                                className="material-icons btn-floating red pulse warning center-align">access_alarm</i><code> -appears
                                                if your task is close to being done or execution time is over ;</code>
                                            </div>
                                            <div><i className="material-icons center-align">check</i><code>- done task
                                                ;</code></div>
                                            <div><code>Time-pickers in the profile-form will help you to choose execution term quickly.</code></div>
                                        </p>
                                    </li>
                                    <br/>
                                    <li>
                                        <p>Page <NavLink to="/list"><a className="info_links">list</a></NavLink> helps
                                            you to distribute your tasks and manage them easily :</p>
                                        <p>
                                            <div><code>In every list you have small list-statistic ;</code></div>
                                            <div><code>Shaky task means that it is close to being done ;</code></div>
                                            <div><code><b>Bold text means important task  ;</b></code></div>
                                            <div style={{textDecoration: "line-through"}}><code>Line through means completed task.</code></div>
                                            <br/>
                                        </p>
                                    </li>
                                    <li>
                                        <p>More detailed statistic of a week activity , and personal settings are located on <NavLink
                                            to="/profile"><a className="info_links">profile </a></NavLink>page :</p>
                                        <p>
                                            <div><code>Line chart shows you last 7 days progress ;</code></div>
                                            <div><code>In form you need to insert your telegram token (more about that in <a
                                                href='#section2'>"Telegram bot integration"</a> section) and your
                                                personal "warnings timer" (insert time and all warnings will be active
                                                if task term is close to being done, "warning timer" works too with "Telegram
                                                bot notifications") , default warning timer is 2 hours ;</code></div>
                                            <div><code>You can switch-off notifications in application and telegram-bot,
                                                in personal-form by the <BootstrapSwitchButton
                                                    onlabel={<i className="material-icons black-text">alarm_on</i>}
                                                    offlabel={<i
                                                        className="material-icons black-text">alarm_off</i>}/> button
                                                click ;</code></div>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-action">
                                <code><a>Made by : Dmytrii Prykhodko</a></code>
                                <code><a>V 1.00</a></code>
                                <code><a>2021</a></code>
                            </div>
                        </div>
                    </div>
                </div>
            <ScrollableAnchor id={'section2'}>
                <div className="row">
                    <div className="col s12 m6 l6">
                        <div className="card blue-grey darken-4">
                            <div className="card-content white-text">
                                <span className="card-title">Telegram bot integration</span>
                                <p>
                                    When i decided to develop this web-application , i had several ideas how i could
                                    implement "command-tasks" , "sharing-tasks" and notification , but i chose
                                    Telegram-bot because -
                                    its the most used messenger now , and it will be cool to share some task with your
                                    contacts , or get notification from your messenger , so let`s start to work with our
                                    bot.
                                </p>
                                <p>
                                    <ul>
                                        <li><p>First of all , you need to call bot in telegram - <code
                                            className="red-text">@border_helper_bot </code>;</p></li><br/>
                                        <li><p>Next step is to call <code className="red-text">/get_id</code> command in bot chat and
                                            put gained token on <NavLink to="/profile"><a
                                                className="info_links">profile </a></NavLink>page into "Telegram" field
                                            ;</p></li><br/>
                                        <li><p>After that you can use all bot commands , full list of command you can get
                                            with <code className="red-text">/help</code> or <code
                                                className="red-text">/start</code> command;</p></li><br/>
                                        <li><p>If you want to get notifications about scheduled tasks , write down <code
                                            className="red-text">/notification_on</code> to turn off this function
                                            use <code className="red-text">/notification_off</code>, but you have to be
                                            very attentive , your notifications in app must be active if you want to get
                                            them from bot !</p></li>
                                    </ul>
                                </p>
                                <p>
                                    That`s all what you need to know about my Tg-bot and web-application , i hope my project will help you to make your task-management more convenient and you will enjoy this application.  Thank you for your attention !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollableAnchor>
        </div>)
}

export default Info