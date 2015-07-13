var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var ImagePreview = require('./image-preview');
var Infinite = require('react-infinite');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      images: []
    }
  },
  componentWillMount: function() {
    Actions.getImages(this.props.params.id);
  },
  componentWillReceiveProps: function(nextProps){
    Actions.getImages(nextProps.params.id);
  },
  render: function() {
    return <div className="topic">
      {this.renderImages()}
    </div>
  },
  renderImages: function() {
    var imageList = this.state.images.map(function(image) {
      return <ImagePreview key={image.id} {...image} />
    });

    return <Infinite containerHeight={500} elementHeight={45}>
      {imageList}
    </Infinite>
  },
  onChange: function(event, images) {
    this.setState({images: images})
  }
});
