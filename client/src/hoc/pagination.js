import React from "react"


const withPagination = (WrapedComponent, obj) => {
    return class extends React.Component {

        state = {
            todoCount:this.props.amount,
            currentPage: 1,
            pageAmount: null,
            count: obj.count,
            gridNum: 0,
            showingPages: obj.showingPages,
            skip: 0,
        }
        calcTCPA() {
            const {count, todoCount} = this.state
            const pageCount = Math.ceil(todoCount / count)
            this.setState({...this.state, pageAmount: pageCount})
        }
        getNum(){
            console.log(this.state.pageAmount)
        }

        componentDidMount() {

            this.calcTCPA()

        }

        goToPage = (pageNumber) => {
            this.setState(
                function ([prevState,curProps]) {
                    return {...this.state,
                        currentPage: pageNumber,
                        skip : (pageNumber -1) * prevState.count
                }
                })
        }

        arrow = (turn) => {

            if (turn === "left" && this.state.gridNum >= this.state.showingPages) {
                this.setState(function (prevState, props) {
                    return {
                        ...this.state,
                        gridNum: prevState.gridNum - prevState.showingPages,
                        currentPage: prevState.gridNum - prevState.showingPages,
                        skip : (prevState.gridNum - prevState.showingPages-1) * prevState.count
                    }
                })
            } else {
                this.setState({
                    ...this.state,
                    gridNum: 0,
                    currentPage: 1,
                    skip : 0
                })
            }

            if (turn === "right" && this.state.pageAmount + this.state.showingPages < this.state.gridNum + this.state.showingPages) {
                this.setState(function (prevState, props) {
                    return {
                        ...this.state,
                        gridNum: prevState.gridNum + prevState.showingPages,
                        currentPage: prevState.gridNum + prevState.showingPages,
                        skip : (prevState.gridNum + prevState.showingPages-1) * prevState.count

                    }
                })
            } else {
                return
            }

        }

        render() {
            return (
                <WrapedComponent {...this.props} arrow={this.arrow} goToPage={this.goToPage} pState={this.state}
                                 limit={this.state.count} skip={this.state.skip} getAmount={this.getNum}/>
            )
        }
    }
}

export default withPagination



